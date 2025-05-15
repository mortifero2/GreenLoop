const comprasPorUtilizador = JSON.parse(localStorage.getItem("comprasPorUtilizador")) || {};
const email = localStorage.getItem("email");

document.getElementById("form-doacao").addEventListener("submit", (e) => {
  e.preventDefault();

  const codigo = document.getElementById("codigo").value.trim().toUpperCase();
  const quantidadeDesejada = parseFloat(document.getElementById("quantidade").value);
  const tipo = document.getElementById("tipo").value;
  const descricao = document.getElementById("descricao").value.trim();
  const apoio = document.getElementById("apoio").value;
  const localRecolha = document.getElementById("local").value.trim();
  const pesoEstimado = parseFloat(document.getElementById("peso-estimado").value);
  const mensagem = document.getElementById("mensagem");

  const compras = comprasPorUtilizador[email] || [];
  const produto = compras.find(p => p.codigo === codigo);

  if (!produto) {
    mensagem.textContent = "❌ Código inválido. Só podes doar/trocar produtos comprados.";
    mensagem.style.color = "red";
    return;
  }

  let inventario = JSON.parse(localStorage.getItem("inventarioPorUtilizador")) || {};
  if (!inventario[email] || !inventario[email][codigo]) {
    mensagem.textContent = "❌ Este material já não se encontra disponível no teu inventário.";
    mensagem.style.color = "red";
    return;
  }

  const quantidadeDisponivel = inventario[email][codigo].quantidade;
  if (quantidadeDesejada > quantidadeDisponivel) {
    mensagem.textContent = `❌ Só tens ${quantidadeDisponivel} kg disponíveis desse material.`;
    mensagem.style.color = "red";
    return;
  }

  const novaDoacao = {
    dono: email,
    nome: produto.nome,
    codigo: produto.codigo,
    quantidade: quantidadeDesejada,
    tipo,
    descricao,
    apoio,
    localRecolha,
    pesoEstimado,
    data: new Date().toLocaleDateString("pt-PT")
  };

  const doacoes = JSON.parse(localStorage.getItem("doacoesDisponiveis")) || [];
  doacoes.push(novaDoacao);
  localStorage.setItem("doacoesDisponiveis", JSON.stringify(doacoes));

  // Atualizar inventário
  inventario[email][codigo].quantidade -= quantidadeDesejada;
  if (inventario[email][codigo].quantidade <= 0) {
    delete inventario[email][codigo];
  }

  localStorage.setItem("inventarioPorUtilizador", JSON.stringify(inventario));

  mensagem.textContent = `✅ Material publicado para ${tipo.toLowerCase()} com sucesso!`;
  mensagem.style.color = "green";
});

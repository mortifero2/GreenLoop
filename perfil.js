window.onload = function () {
  const nome = localStorage.getItem("usuario");
  const email = localStorage.getItem("email");

  if (!nome || !email) {
    window.location.href = "login.html";
    return;
  }

  const utilizadores = JSON.parse(localStorage.getItem("utilizadores")) || [];
  const utilizador = utilizadores.find(u => u.nome === nome && u.email === email);

  document.getElementById("nome").textContent = nome;
  document.getElementById("empresa").textContent = utilizador?.empresa || "Desconhecida";

  const comprasPorUtilizador = JSON.parse(localStorage.getItem("comprasPorUtilizador")) || {};
  const doacoes = JSON.parse(localStorage.getItem("doacoesDisponiveis")) || [];

  const compras = comprasPorUtilizador[email] || [];

  let totalComprado = 0;
  let totalCo2 = 0;
  let totalAgua = 0;
  const usoPorMaterial = {};

  compras.forEach(c => {
    totalComprado += c.quantidadeComprada;
    totalCo2 += c.co2Emissoes;
    totalAgua += c.aguaConsumida;

    if (!usoPorMaterial[c.nome]) usoPorMaterial[c.nome] = 0;
    usoPorMaterial[c.nome] += c.quantidadeComprada;
  });

  const minhasDoacoes = doacoes.filter(d => d.dono === email);
  const totalDoado = minhasDoacoes.reduce((acc, d) => acc + d.quantidade, 0);

  document.getElementById("total-comprado").textContent = totalComprado.toFixed(1);
  document.getElementById("total-co2").textContent = totalCo2.toFixed(2);
  document.getElementById("total-agua").textContent = totalAgua.toFixed(2);
  document.getElementById("total-doado").textContent = totalDoado.toFixed(1);

  // Mensagens personalizadas
  const mensagens = [];

  if (totalDoado > 0) {
    mensagens.push(`🎉 Parabéns! Já doaste ${totalDoado.toFixed(1)} kg de materiais! Isto é circularidade em ação. ♻️`);
  }

  if (totalComprado > 0 && totalDoado === 0) {
    mensagens.push(`💡 Já compraste vários materiais! Que tal doar os que não estás a usar?`);
  }

  const divMensagens = document.getElementById("mensagens-progresso");
  divMensagens.innerHTML = mensagens.map(m => `<p>${m}</p>`).join("");

  document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("usuario");
    localStorage.removeItem("email");
    window.location.href = "index.html";
  });
};

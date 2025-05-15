window.onload = function () {
  const email = localStorage.getItem("email");
  const comprasPorUtilizador = JSON.parse(localStorage.getItem("comprasPorUtilizador")) || {};
  const doacoes = JSON.parse(localStorage.getItem("doacoesDisponiveis")) || [];

  const compras = comprasPorUtilizador[email] || [];

  // Agrupar compras por código
  const inventario = {};

  compras.forEach(c => {
    if (!inventario[c.codigo]) {
      inventario[c.codigo] = {
        nome: c.nome,
        codigo: c.codigo,
        quantidade: 0,
        co2Emissoes: 0,
        aguaConsumida: 0,
      };
    }

    inventario[c.codigo].quantidade += c.quantidadeComprada;
    inventario[c.codigo].co2Emissoes += c.co2Emissoes;
    inventario[c.codigo].aguaConsumida += c.aguaConsumida;
  });

  // Subtrair doações do inventário
  doacoes.forEach(d => {
    if (d.dono === email && inventario[d.codigo]) {
      inventario[d.codigo].quantidade -= d.quantidade;

      if (inventario[d.codigo].quantidade <= 0) {
        delete inventario[d.codigo]; // Remove se ficar a 0 ou menos
      }
    }
  });

  const lista = document.getElementById("lista-inventario");
  lista.innerHTML = "";

  const codigos = Object.keys(inventario);
  if (codigos.length === 0) {
    lista.innerHTML = "<p>O teu inventário está vazio.</p>";
    return;
  }

  codigos.forEach(codigo => {
    const mat = inventario[codigo];

    const artigo = document.createElement("article");
    artigo.className = "material";

    artigo.innerHTML = `
      <h2>${mat.nome}</h2>
      <p><strong>Código:</strong> ${mat.codigo}</p>
      <p><strong>Quantidade atual:</strong> ${mat.quantidade.toFixed(1)} kg</p>
      <p><strong>Total de CO₂:</strong> ${mat.co2Emissoes.toFixed(2)} kg</p>
      <p><strong>Água consumida:</strong> ${mat.aguaConsumida.toFixed(2)} litros</p>
    `;

    lista.appendChild(artigo);
  });
};

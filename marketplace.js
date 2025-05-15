// Lista de produtos industriais com dados ambientais
let produtos = [
  {
    nome: "Plástico PET",
    local: "Armazém A",
    codigo: "PET-001",
    co2EmissoesPorKg: 2.1,
    aguaConsumidaPorKg: 60,
  },
  {
    nome: "Plástico PP",
    local: "Armazém B",
    codigo: "PP-002",
    co2EmissoesPorKg: 1.8,
    aguaConsumidaPorKg: 50,
  },
  {
    nome: "Plástico PVC",
    local: "Armazém C",
    codigo: "PVC-003",
    co2EmissoesPorKg: 2.0,
    aguaConsumidaPorKg: 40,
  },
];

// Função para atualizar a lista de produtos na interface
function atualizarLista() {
  const lista = document.getElementById("lista-materials");
  lista.innerHTML = ""; // Limpa a lista existente

  produtos.forEach((produto) => {
    const artigo = document.createElement("article");
    artigo.className = "material";

    artigo.innerHTML = `
      <h2>${produto.nome}</h2>
      <p><strong>Local:</strong> ${produto.local}</p>
      <p><strong>Código:</strong> ${produto.codigo}</p>
      <p><strong>Emissões de CO2 por kg:</strong> ${produto.co2EmissoesPorKg} kg</p>
      <p><strong>Água consumida por kg:</strong> ${produto.aguaConsumidaPorKg} litros</p>
      
      <label for="quantidade-${produto.codigo}">Quantidade (kg):</label>
      <input type="number" id="quantidade-${produto.codigo}" min="1" value="1" step="0.1">
      
      <button onclick="comprarProduto('${produto.codigo}')">Comprar</button>
    `;

    lista.appendChild(artigo);
  });
}

// Função para simular a compra do produto
function comprarProduto(codigo) {
  const produto = produtos.find(p => p.codigo === codigo);
  const quantidadeKg = parseFloat(document.getElementById(`quantidade-${codigo}`).value);

  if (quantidadeKg <= 0 || isNaN(quantidadeKg)) {
    alert("Por favor, insira uma quantidade válida.");
    return;
  }

  const email = localStorage.getItem("email");
  let comprasPorUtilizador = JSON.parse(localStorage.getItem("comprasPorUtilizador")) || {};

  if (!comprasPorUtilizador[email]) {
    comprasPorUtilizador[email] = [];
  }

  const compra = {
    nome: produto.nome,
    codigo: produto.codigo,
    quantidadeComprada: quantidadeKg,
    co2Emissoes: produto.co2EmissoesPorKg * quantidadeKg,
    aguaConsumida: produto.aguaConsumidaPorKg * quantidadeKg,
  };

  comprasPorUtilizador[email].push(compra);
  localStorage.setItem("comprasPorUtilizador", JSON.stringify(comprasPorUtilizador));

  // Atualizar o inventário
  let inventario = JSON.parse(localStorage.getItem("inventarioPorUtilizador")) || {};
  if (!inventario[email]) inventario[email] = {};

  if (!inventario[email][codigo]) {
    inventario[email][codigo] = {
      nome: produto.nome,
      codigo: produto.codigo,
      quantidade: 0,
      co2Emissoes: 0,
      aguaConsumida: 0
    };
  }

  inventario[email][codigo].quantidade += quantidadeKg;
  inventario[email][codigo].co2Emissoes += produto.co2EmissoesPorKg * quantidadeKg;
  inventario[email][codigo].aguaConsumida += produto.aguaConsumidaPorKg * quantidadeKg;

  localStorage.setItem("inventarioPorUtilizador", JSON.stringify(inventario));

  alert(`Você comprou ${quantidadeKg} kg de ${produto.nome}.`);

  atualizarLista();
}

window.onload = function () {
  atualizarLista();
};

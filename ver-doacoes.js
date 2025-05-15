window.onload = function () {
    const lista = document.getElementById("lista-doacoes");
    const doacoes = JSON.parse(localStorage.getItem("doacoesDisponiveis")) || [];
  
    if (doacoes.length === 0) {
      lista.innerHTML = "<p>Não há materiais disponíveis no momento.</p>";
      return;
    }
  
    doacoes.forEach((d) => {
      const item = document.createElement("article");
      item.className = "material";
  
      item.innerHTML = `
        <h2>${d.nome}</h2>
        <p><strong>Código:</strong> ${d.codigo}</p>
        <p><strong>Quantidade:</strong> ${d.quantidade} kg</p>
        <p><strong>Tipo:</strong> ${d.tipo}</p>
        <p><strong>Descrição:</strong> ${d.descricao || "Sem descrição adicional."}</p>
        <p><strong>Data:</strong> ${d.data}</p>
      `;
  
      lista.appendChild(item);
    });
  };
  
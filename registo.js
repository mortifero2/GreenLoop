document.getElementById("form-registo").addEventListener("submit", function (e) {
  e.preventDefault();

  const primeiro = document.getElementById("primeiro").value.trim();
  const ultimo = document.getElementById("ultimo").value.trim();
  const empresa = document.getElementById("empresa").value.trim();
  const tipoEntidade = document.getElementById("tipo-entidade").value;
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  const mensagem = document.getElementById("mensagem");

  let utilizadores = JSON.parse(localStorage.getItem("utilizadores")) || [];

  const existe = utilizadores.find(u => u.email === email);

  if (existe) {
    mensagem.textContent = "❌ Já existe uma conta com este email.";
    mensagem.style.color = "red";
    return;
  }

  const novo = {
    email,
    password,
    nome: `${primeiro} ${ultimo}`,
    empresa,
    tipoEntidade
  };

  utilizadores.push(novo);
  localStorage.setItem("utilizadores", JSON.stringify(utilizadores));

  mensagem.textContent = "✅ Registo efetuado com sucesso!";
  mensagem.style.color = "green";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});

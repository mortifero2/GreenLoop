document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const mensagem = document.getElementById("mensagem-login");

  const utilizadores = JSON.parse(localStorage.getItem("utilizadores")) || [];
  const utilizador = utilizadores.find(u => u.email === email && u.password === password);

  if (!utilizador) {
    mensagem.textContent = "❌ Email ou palavra-passe incorretos, ou conta não registada.";
    mensagem.style.color = "red";
    return;
  }

  // Armazena o nome e email no localStorage
  localStorage.setItem("usuario", utilizador.nome);
  localStorage.setItem("email", utilizador.email); // Adiciona esta linha para salvar o email

  mensagem.textContent = "✅ Login efetuado com sucesso!";
  mensagem.style.color = "green";

  setTimeout(() => {
    window.location.href = 'index.html'; // Redireciona para a página principal após login
  }, 1500);
});

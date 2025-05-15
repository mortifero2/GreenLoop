//localStorage.clear();
window.onload = function () {
    const nomeUsuario = localStorage.getItem("usuario");
    const userIcon = document.getElementById("user-icon");
  
    if (nomeUsuario) {
      // Mostra o nome do utilizador como link para o perfil
      userIcon.innerHTML = `<a href="perfil.html" class="login-button">${nomeUsuario}</a>`;
    } else {
      // Mostra o ícone de login
      userIcon.innerHTML = `
        <a href="login.html">
          <img src="simbolologin.png" alt="Login">
        </a>`;
    }
  };
  
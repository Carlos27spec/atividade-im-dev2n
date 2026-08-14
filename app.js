const Perfil = document.getElementById("Perfil");
const container = document.getElementById("container");
const contatos = container.innerHTML;

Perfil.addEventListener("click", function () {
  const telaAT = Perfil.classList.contains("ativo");

  if (telaAT) {
    Perfil.classList.remove("ativo");
    container.innerHTML = contatos;
  } else {
    Perfil.classList.add("ativo");

    container.innerHTML = `
      <h1 class="user">Perfil</h1>
    <div class="foto">
      <img src="https://i.pravatar.cc/150?img=55" alt="" />
    </div>
    <div class="info">
      <h2>Nome</h2>
      <p>Ricardo da Silva</p>
      <h2>Recado</h2>
      <div class="sit">
        <p>disponível</p>
        <img src="./assets/icons/cursor-pointer.svg" alt="" />
      </div>
      <h2>Telefone</h2>
      <div class="numero">
        <div class="numero-left">
        <img src="./assets/icons/phone.svg" alt="" />
        <p>+55 11 98787 6567</p>
        </div>
        <img src="./assets/icons/copy-btn.svg" alt="" />
      </div>
    </div>
    <div class="final">
      <h2>Trocar de Perfil</h2>
      <div class="perfis">
      <div class="perfil-item">
      <img src="https://i.pravatar.cc/150?img=55" alt="" />
      <p>Tom Cruise</p>
      </div>
      <div class="perfil-item">
      <img src="https://i.pravatar.cc/150?img=55" alt="" />
      <p>Giga</p>
      </div>
      <div class="perfil-item">
      <img src="https://i.pravatar.cc/150?img=55" alt="" />
      <p>Jaden</p>
      </div>
      <div class="perfil-item">
      <img src="https://i.pravatar.cc/150?img=55" alt="" />
      <p>Henrique</p>
      </div>
      </div>
    </div>
  `;
  }
});

import { usuarios, listarUsuarios, usuarioID, mensagens } from "./contatos.js";

const elemento = {
  caixa_de_mensagens: document.querySelector(".msg-container"),
  input_mensagem: document.querySelector("input[type='text']"),
  conversa: document.querySelector(".mensagens"),
  lista_contatos: document.querySelector(".todoscontatos"),
};

mensagens(2, 1);

const listar = listarUsuarios(2);

// console.log(listar);

const userAT = {
  usuarioAtual: 1,
  contatoAtual: 0,
};

function carregarContatos(usuarioIndex) {
  elemento.lista_contatos.innerHTML = "";

  const contatos = usuarioID(usuarioIndex);

  contatos.forEach((contato, index) => {
    const ultimaMsg = contato.messages[contato.messages.length - 1];

    criarContatos(
      `https://i.pravatar.cc/150?u=${contato.number}`,
      contato.name,
      ultimaMsg.time,
      ultimaMsg.content,
      0,
      index,
    );
  });
}

elemento.lista_contatos.addEventListener("click", (e) => {
  const card = e.target.closest(".Contatos");
  if (!card) return;

  userAT.contatoAtual = Number(card.id);
  conversas(userAT.usuarioAtual, userAT.contatoAtual);
});

function conversas(usuarioIndex, contatoIndex) {
  const historicoMsg = mensagens(usuarioIndex, contatoIndex);
  const contato = usuarioID(usuarioIndex)[contatoIndex];

  elemento.conversa.innerHTML = "";

  historicoMsg.forEach((msg) => {
    const p = document.createElement("p");
    const span = document.createElement("span");

    p.classList.add(msg.sender === "me" ? "enviada" : "recebida");
    p.append(document.createTextNode(msg.content));

    span.classList.add("hora");
    span.innerText = msg.time;
    p.append(span);

    elemento.conversa.append(p);
  });

  elemento.conversa.scrollTop = elemento.conversa.scrollHeight;

  document.querySelector(".perfil h2").innerText = contato.name;
}

carregarContatos(userAT.usuarioAtual);
conversas(userAT.usuarioAtual, userAT.contatoAtual);

elemento.caixa_de_mensagens.addEventListener("submit", (e) => {
  e.preventDefault();
  insertmessage(elemento.input_mensagem.value);
});

function horario() {
  const data = new Date().toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return data;
}

function insertmessage(message) {
  if (!message.trim()) return;

  const paragrafo = document.createElement("p");
  const span = document.createElement("span");

  paragrafo.classList.add("enviada");
  paragrafo.append(document.createTextNode(message));

  span.classList.add("hora");
  span.innerText = horario();
  paragrafo.append(span);

  elemento.conversa.append(paragrafo);
  elemento.conversa.scrollTop = elemento.conversa.scrollHeight;
  elemento.input_mensagem.value = "";
}

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

function criarContatos(srcFoto, nome, hora, ultima, NaoLidas, idContato) {
  //criação dos elementos dos card de contatos
  const cardContainer = document.createElement("div");
  const fotoContato = document.createElement("img");
  const nomeContato = document.createElement("h2");
  const ultimaMsg = document.createElement("p");
  const horaMsg = document.createElement("div");
  const msgNaoLidas = document.createElement("div");

  //Define qual classe CSS será aplicada para estilizar o elemento
  cardContainer.className = "Contatos";
  fotoContato.className = "img";
  nomeContato.className = "h2";
  ultimaMsg.className = "p";
  horaMsg.className = "hour";
  msgNaoLidas.className = "msg";

  //Preenche os dados que serão recebidos como parametro da função
  fotoContato.src = srcFoto;
  nomeContato.innerText = nome;
  horaMsg.innerText = hora;
  msgNaoLidas.innerText = NaoLidas;
  ultimaMsg.innerText = ultima;

  // Adiciona o ID do contato no container para servir de parametro da função que carregas as mensagens
  cardContainer.id = idContato;

  //adiciona os elementos filhos ao card de contato.
  cardContainer.append(
    fotoContato,
    nomeContato,
    ultimaMsg,
    horaMsg,
    msgNaoLidas,
  );

  //Adiciona o card a lista de contatos
  elemento.lista_contatos.append(cardContainer);
}

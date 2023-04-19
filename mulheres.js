const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

const mulheres = [
  {
    nome: "Juliete Dias",
    imagem: "https://avatars.githubusercontent.com/u/71693559?v=4",
    minibio: "Desenvolvedora Full-Stack",
  },
  {
    nome: "Iana Chan",
    imagem: "https://tinyurl.com/yjs48v9s",
    minibio: "Fundadora da PrograMaria",
  },
  {
    nome: "Nina da Hora",
    imagem: "https://tinyurl.com/2xzpne3k",
    minibio: "Hacker antirracista",
  },
];

function mostraMulheres(request, response) {
  response.json(mulheres);
}

function mostraPorta() {
  console.log(`Servidor rodando na porta ${porta}`);
}

app.use(router.get("/mulheres", mostraMulheres));
app.listen(porta, mostraPorta);

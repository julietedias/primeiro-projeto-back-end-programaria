const express = require("express");
const router = express.Router();
const cors = require("cors"); // permite consumir essa api no front

const conectaBancoDeDados = require("./bancoDeDados");
conectaBancoDeDados();

const Mulher = require("./mulherModel");

const app = express();
app.use(express.json());
app.use(cors());

const porta = 3333;

// GET
async function mostraMulheres(request, response) {
  try {
    const mulheresVindasDoBancoDeDados = await Mulher.find();

    response.json(mulheresVindasDoBancoDeDados);
  } catch (erro) {
    console.log(erro);
  }
}

// POST
async function criaMulher(request, response) {
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    citacao: request.body.citacao,
    minibio: request.body.minibio,
  });

  try {
    const mulherCriada = await novaMulher.save();

    response.status(201).json(mulherCriada);
  } catch (erro) {
    console.log(erro);
  }
}

// PATCH
async function corrigeDadoMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id);

    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome;
    }

    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem;
    }

    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio;
    }

    if (request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao;
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();
    response.json(mulherAtualizadaNoBancoDeDados);
  } catch (erro) {
    console.log(erro);
  }
}

// DELETE
async function deletaDadosMulher(request, response) {
  try {
    await Mulher.findByIdAndDelete(request.params.id);
    response.json({ mensagem: "Mulher deletada com sucesso!" });
  } catch (erro) {
    console.log(erro);
  }
}

function mostraPorta() {
  console.log(`Servidor rodando na porta ${porta}`);
}

app.use(router.get("/mulheres", mostraMulheres));
app.use(router.post("/mulheres", criaMulher));
app.use(router.patch("/mulheres/:id", corrigeDadoMulher));
app.use(router.delete("/mulheres/:id", deletaDadosMulher));
app.listen(porta, mostraPorta);

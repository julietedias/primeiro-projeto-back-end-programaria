const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json({
        nome: 'Juliete Dias',
        imagem: 'https://avatars.githubusercontent.com/u/71693559?v=4',
        minibio: 'Desenvolvedora Full-Stack'
    })
}

function mostraPorta() {
    console.log(`Servidor rodando na porta ${porta}`)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)
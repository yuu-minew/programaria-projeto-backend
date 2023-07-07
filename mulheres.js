const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraPorta() {
    console.log("Servidor rodando na porta: ", porta)
}

const mulheres = [
    {
        nome: 'Simara Conceição',
            imagem: 'https://github.com/simaraconceicao.png',
            minibio: 'Desenvolvedora e Instrutora'
    },
    {
        nome: 'Iana Chan',
            imagem: 'https://bit.ly/3JCXBqP',
            minibio: 'CEO & Founder PrograMaria'
    },
    {
        nome: 'Luana Pimentel',
            imagem: 'https://bit.ly/3FKpFaz',
            minibio: 'Senior Staff Software Engineer'
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)
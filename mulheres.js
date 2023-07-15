const express = require("express") //inicia o express
const router = express.Router() //configura a primeira parte da rota
const cors = require('cors') //pacote cors, permite consumir API no front

const conectaBancoDeDados = require('./bancoDeDados') //conectando ao arquivo banco de dados
conectaBancoDeDados() // chamando funçao

const Mulher = require('./mulherModel')

const app = express() //inicia o app
app.use(express.json())
app.use(cors())

const porta = 3333 //criando porta

//PORTA
function mostraPorta() {
    console.log("Servidor rodando na porta: ", porta)
}

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    }catch(erro) {
        console.log(erro)
    }
}

//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
    try {
        const mulherCriada = await novaMulher.save()

        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response) {    
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

        response.status(200).json(mulherAtualizadaNoBancoDeDados)
    } catch (erro){
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)

        response.json({mensagem: 'Mulher deletada com sucesso!'})
    } catch (erro) {
        console.log(erro)
    }
}

app.use(router.get('/mulheres', mostraMulheres)) // config rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //config rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //config PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //config DELETE /mulheres/:id

app.listen(porta, mostraPorta) //servidor ouvindo a porta
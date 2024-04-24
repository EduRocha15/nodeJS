const express = require('express')
const router = express.Router()

module.exports = router

let listaFuncionarios =[
    {
      "id": 1,
      "nome": "João Silva",
      "idade": 30,
      "cargo": "Gerente de Vendas",
      "salario": 5000
    },
    {
      "id": 2,
      "nome": "Maria Souza",
      "idade": 25,
      "cargo": "Assistente Administrativo",
      "salario": 3000
    },
    {
      "id": 3,
      "nome": "Pedro Santos",
      "idade": 35,
      "cargo": "Analista de Sistemas",
      "salario": 4500
    },
    {
      "id": 4,
      "nome": "Ana Oliveira",
      "idade": 28,
      "cargo": "Designer Gráfico",
      "salario": 4000
    },
    {
      "id": 5,
      "nome": "Carlos Lima",
      "idade": 40,
      "cargo": "Contador",
      "salario": 5500
    }
]

router.get('/funcionarios', (req, res)=>{
  res.json(listaFuncionarios)
})

router.get('/funcionarios/:id', (req, res)=>{

  const id = req.params.id
  const funcionario = listaFuncionarios.find(funcionario => funcionario.id == id)

  if(funcionario){
    return res.status(200).json(funcionario)
  } return res.status(404).json({mensagem: "Funcionário não encontrado em nosso banco de dados."})
})

router.post('/funcionarios', (req, res)=>{

  const corpo = req.body

  if(!corpo.nome || !corpo.idade || !corpo.cargo || !corpo.salario){
    return res.status(400).json({mensagem: "Todos os dados são obrigatiros!"})
  }

  const novoFuncionario = {
    id: listaFuncionarios.length +1,
    nome: corpo.nome,
    idade: corpo.idade,
    cargo: corpo.cargo,
    salario: corpo.salario
  }

  listaFuncionarios.push(novoFuncionario)

  return res.status(201).json({mensagem: "Novo funcionário cadastrado com sucesso!"})
})

router.put('/funcionarios/:id', (req, res)=>{

  const id = req.params.id
  const corpo = req.body
  const index = listaFuncionarios.findIndex(funcionario => funcionario.id == id)

  if(index == -1){
    return res.status(404).json({mensagem: "Funcionário não encontrado!"})
  }

  if(!corpo.nome || !corpo.idade || !corpo.cargo || !corpo.salario){
    return res.status(400).json({mensagem: "Todos os dados são obrigatiros!"})
  }

  const dadosAtualizados = {
    id: Number(id),
    nome: corpo.nome,
    idade: corpo.idade,
    cargo: corpo.cargo,
    salario: corpo.salario
  }

  listaFuncionarios[index] = dadosAtualizados

  return res.status(200).json({mensagem: "Dados atualizado com sucesso!"})
})

router.delete('/funcionarios/:id', (req, res)=>{

  const id = req.params.id
  const index = listaFuncionarios.findIndex(funcionario => funcionario.id == id)

  if(index == -1){
    return res.status(404).json({mensagem: "Funcionário não encontrado!"})
  }
  
  listaFuncionarios.splice(index, 1)

  return res.status(200).json({mensagem: "Funcionário excluído com sucesso!"})
})
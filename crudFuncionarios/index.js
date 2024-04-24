const express = require('express')
const app = express()
const port = 3000
const routerFuncionarios = require('./router/funcionarios')

app.use(express.json())

app.use(routerFuncionarios)

app.listen(port,()=>{
  console.log(`API rodando em http://localhost:${port}`)
})
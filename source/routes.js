//Arquivo de Rotas

const express = require('express')

const empresasControle = require('./controladores/empresasControle')
const demandasControle = require('./controladores/demandaControler')
const profileControle = require('./controladores/profileControle')
const loginControle = require('./controladores/loginControle')
const routes = express.Router()

routes.get('/empresas', empresasControle.listagem)
routes.post('/create', empresasControle.create)
routes.delete('/empresa', empresasControle.deletar)
routes.put('/perfil', empresasControle.alterar)

routes.post('/demanda', demandasControle.create)
routes.get('/demandas', demandasControle.listagem)
routes.delete('/demandas/:id', demandasControle.deletar)
routes.put('/demandas/:id', demandasControle.alterar)

routes.get('/demanda', profileControle.listagem)

routes.post('/', loginControle.login)

module.exports = routes
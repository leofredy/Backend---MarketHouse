// Faz a conexão com o banco de dados

const knex = require('knex')
const configuracoes = require('../../knexfile')

const connection = knex(configuracoes.development);

module.exports = connection;
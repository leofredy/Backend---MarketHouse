const connection = require('../database/connection')

module.exports = 
{
    async listagem(request, response)
    {
        
        const cnpj = request.headers.autorizacao
        const demandas = await connection('demandas').where('emp_cnpj', cnpj).select('*')

        return response.json(demandas)
    }
}
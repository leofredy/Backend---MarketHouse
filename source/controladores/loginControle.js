const connection = require('../database/connection')

module.exports = 
{
    async login(request, response)
    {
        const { cnpj, senha } = request.body 

        const empresa = await connection('empresas').where('cnpj', cnpj).where('senha', senha).select('*').first()

        //Se a empresa nao existir no banco de dados
        console.log(!empresa)
        if(!empresa)
        {
            console.log('entrou')
            return response.json('Usuário ou senha inválida!!')
        }

        return response.json(empresa)
    }
}
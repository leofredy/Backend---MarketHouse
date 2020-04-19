const connection = require('../database/connection')

module.exports = 
{
    //criar demanda
    async create(request, response)
    {
        const { nome, descricao, preco, qtd } = request.body
        const emp_cnpj = request.headers.autorizacao
        const empresa = await connection('empresas').where('cnpj', emp_cnpj).select('*').first()

        if(!empresa)
        {
            return response.json('Demanda nao cadastrada!!')
        }

        const [id] = await connection('demandas').insert(
            {
                nome,
                descricao,
                preco,
                qtd,
                emp_cnpj
            }
        )

        return response.json({ id })
    },

    //lista de demandas
    async listagem(request, response)
    {
        const {page = 1} = request.query
        const [count] = await connection('demandas').count()
    

        const demandas = await connection('demandas').limit(5).offset((page - 1) * 5).select('*')

        response.header('totalDemandas', count['count(*)'])
        return response.json(demandas)
    },



    //deletar demandas
    async deletar(request, response)
    {
        const { id } = request.params;
        const cnpj = request.headers.autorizacao;

        const produto = await connection('demandas').where(' id ', id ).select('emp_cnpj').first()
        
        if( produto.emp_cnpj !== cnpj )
        {
            return response.status(401).json({ error: 'Operação inválida' })
        }

        await connection('demandas').where('id', id).delete()
        return response.status(204).send()
    },

    async alterar(request, response)
    {
        const { id } = request.params
        const cnpj = request.headers.autorizacao
        const { nome, descricao, preco, qtd, emp_cnpj } = request.body

        const produto = await connection('demandas').where(' id ', id).select('*').first()

        if ( produto.emp_cnpj !== cnpj )
        {
            return response.status(401).json({ error: 'Operação inválida' })
        }
        else if (nome === "" && descricao === "" && preco === "" && qtd === "")
        {
            return response.status(401).json({ error: 'Preencha todos os campos'})
        }
        else
        {
            await connection ('demandas').where('id', id).update(
                {
                    nome,
                    descricao,
                    preco,
                    qtd,
                    emp_cnpj
                }
            )
            return response.status(200).json('Nome do produto alterado!!')
        }
        
        
      
    }
    
}
const connection = require('../database/connection')

module.exports = 
{


    async listagem(request, response)
    {
        const {page = 1} = request.query
        const [count] = await connection('empresas').count()

        const empresas = await connection('empresas').limit(5).offset((page - 1) * 5).select('*');
        
        response.header('totalEmpresas', count['count(*)'])
        return response.json(empresas)
    },

    async create (request, response)
    {
        
        //Destruturação do JSON por variavel
        const { cnpj, senha, name, tipo_empresa, endereco, bairro, numero, city, uf, email, telefone, horario, descricao } = request.body
       
        if ( cnpj === '' || senha === '' || tipo_empresa === '' || endereco === '' || bairro==='' || numero==='' || city === '' || uf === '' || email === '' || telefone === '' || horario === '' || descricao === '')
        {
            return response.json({error: 'Preencha todos os campos'})
        }
        else
        {
            
            const empresaExiste = await connection('empresas').where('cnpj', cnpj).select('cnpj').first()
            const empresaName = await connection('empresas').where('name', name).select('name').first()
            console.log(empresaExiste)
            console.log(empresaName)
            if(!empresaExiste && !empresaName)
            {
                //Vai aguardar inserir os dados na tabela 'empresas' para continuar
                await connection('empresas').insert({
                    cnpj,
                    senha,
                    name,
                    tipo_empresa,
                    endereco,
                    bairro,
                    numero,
                    city,
                    uf,
                    email,
                    telefone,
                    horario,
                    descricao
                    })

                return response.json(`Conta criada`)
            }
            else if (!empresaExiste)
            {
                return response.json('nome já existe')
            }
            else if(!empresaName)
            {
                return response.json('cnpj já existe')
            }
            else
            {
                return response.json('cnpj e nome já existe')
            }
        }   

    },

    async deletar (request, response)
    {
        const cnpj = request.headers.autorizacao
        const empresa = await connection('empresas').where('cnpj', cnpj).select('cnpj').first()

        if(empresa.cnpj !== cnpj)
        {
            return response.status(401).json({ error: 'Operação inválida' })
        }
        await connection('empresas').where('cnpj', cnpj).delete()
        await connection('demandas').where('emp_cnpj', cnpj).delete()
        return response.json('Conta deletada com sucesso!!')
    },

    async alterar (request, response)
    {
        const { atual, senha, tipo_empresa, endereco, city, uf, email, telefone, horario, descricao } = request.body
        const cnpj = request.headers.autorizacao
        const empresa = await connection('empresas').where('cnpj', cnpj).select('*').first()

        if (!empresa)
        {
            return response.status(401).json('Operação inválida')
        }
        else if ( atual === "" && senha === "" && tipo_empresa === "" && endereco === "" && city === "" && uf === "" && email === "" && telefone === "" && horario === "" && descricao === "")
        {
            return response.status(401).json({error: 'Preencha todos os campos'})
        }
        else
        {
            if(empresa.senha === atual)
            {
                await connection('empresas').where('cnpj', cnpj).update(
                    {
                        senha,
                        tipo_empresa,
                        endereco,
                        city,
                        uf,
                        email,
                        telefone,
                        horario,
                        descricao
                    }
    
                )
            }
            else
            {
                return response.json('Senha inválida')
            }  
        }
        return response.json('Dados alterado com sucesso!!')
        
    }
}
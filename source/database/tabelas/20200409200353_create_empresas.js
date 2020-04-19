
exports.up = function(knex) 
{
    return knex.schema.createTable('empresas', function (table) 
    {
        table.string('cnpj', 14).unique().primary().notNullable();
        table.string('senha').notNullable();
        table.string('name').unique().notNullable();
        table.string('tipo_empresa').notNullable();
        table.string('endereco').notNullable();
        table.string('bairro').notNullable();
        table.string('numero').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('email').notNullable();
        table.string('telefone').notNullable();  
        table.string('horario').notNullable();
        table.string('descricao').notNullable();
    })
};

exports.down = function(knex)
{
    return knex.schema.dropTable('empresas')
};


exports.up = function(knex) 
{
    return knex.schema.createTable('demandas', function(table)
    {
        table.increments();

        table.string('nome').notNullable();
        table.string('descricao').notNullable();
        table.decimal('preco').notNullable();
        table.string('qtd').notNullable();

        table.string('emp_cnpj').notNullable();
        table.foreign('emp_cnpj').references('cnpj').inTable('empresas')
    })
};

exports.down = function(knex) 
{
    return knex.schema.dropTable('demandas')
};

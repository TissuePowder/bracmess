exports.up = function (knex) {
    return knex.schema
        .createTable('tenant', table => {
            table.integer('id').unique().primary();
            table.text('name').notNullable();
            table.text('email').unique();
            table.text('phone').unique();
            table.enu('role', ['regular', 'guest', 'manager']).defaultTo('regular');
            table.text('password');
            table.timestamps(true, true);
        })
        .createTable('bazar', table => {
            table.increments('id');
            table.date('date').notNullable();
            table.decimal('expense', 6, 2).unsigned();
            table.integer('tenantId').references('id').inTable('tenant').onDelete('SET NULL');
            table.timestamps(true, true);
        })
        .createTable('mealType', table => {
            table.integer('id').unique().primary();
            table.text('name').notNullable();
            table.text('description');
            table.timestamps(true, true);
        })
        .createTable('meal', table => {
            table.increments('id');
            table.date('date').notNullable();
            table.integer('tenantId').references('id').inTable('tenant').onDelete('SET NULL');
            table.integer('mealTypeId').references('id').inTable('mealType').onDelete('SET NULL');
            table.integer('quantity').unsigned().defaultTo(0);
            table.timestamps(true, true);
        })

};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('meal')
        .dropTableIfExists('mealType')
        .dropTableIfExists('bazar')
        .dropTableIfExists('tenant')
};

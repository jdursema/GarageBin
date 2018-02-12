
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('stuff', function(table){
      table.increments('id').primary();
      table.string('name');
      table.string('reason_for_linger');
      table.string('cleanliness');
      table.timestamps(true, true)
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('stuff')
  ])
};

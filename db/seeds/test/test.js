
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stuff').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('stuff').insert([
          {name: 'Piggies',
          reason_for_linger: 'Their tails are cute',
          cleanliness: 'Rancid',
          },
          {name: 'Beer',
          reason_for_linger: 'Sometimes you jsut need a beer',
          cleanliness: 'Sparkling'}
        ])
        .then(() => console.log('Seeding complete'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    });
};

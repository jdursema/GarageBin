
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stuff').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('stuff').insert([
          {name: 'Car',
          reason_for_linger: 'I need it',
          cleanliness: 'Dusty',
          },
          {name: 'Winter Clothes',
          reason_for_linger: 'Keep me warm in the winter',
          cleanliness: 'Sparkling'}
        ])
        .then(() => console.log('Seeding complete'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    });
};

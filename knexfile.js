// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/garagebin',
    migrations: {
      directory: './db/migrations'
    },
    seeds:{
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  }

};

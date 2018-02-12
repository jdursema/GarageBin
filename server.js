const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/public')))

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log('listening');
});

app.get('/api/v1/stuff', (request, response) => {
  database('stuff').select()

    .then(stuff => {
      return response.status(200).json({
        stuff
      })
    })
    .catch(error => {
      return response.status(500).json({
        error
      })
    })
});

app.post('/api/v1/stuff', (request, response) => {
  const thing = request.body;

  for (let requiredParameter of [
    'name',
    'reason_for_linger',
    'cleanliness'
  ]){
    if(!thing[requiredParameter]){
      return response.status(422).json({
        error: `You are missing the required parameter ${requiredParameter}`
      });
    }
  }
  database('stuff').insert(thing, 'id')
    .then(thing => {
      return response.status(201).json({
        id: thing[0]
      })
    })
    .catch( error => {
      return response.status(500).json({
        error
      })
    })

})

module.exports = app;
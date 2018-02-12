const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const environment = process.env.NODE_ENV
// const database = require('knex')(configuration);
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/public')))

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log('listening');
});

module.exports = app;
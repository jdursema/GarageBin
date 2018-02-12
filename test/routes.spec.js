process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('Client routes', function() {
  it('should return the home page', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch(error => {
      throw error;
    })
  })
  it('should return a 404 for a rout that does not exist', () => {
    return chai.request(server)
    .get('/whatyoudoin')
    .then(() => {
    })
    .catch(error => {
      error.should.have.status(404);
    })
  })
})

describe('API Routes', () => {
  before((done) => {
  knex.seed.run()
    .then(() => {
      done();
    })
  })

  describe('GET /api/v1/stuff', () => {
    it('should return all of the things in the garage', () => {
      return chai.request(server)
      .get('/api/v1/stuff')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.stuff[0].should.have.property('id');
        response.body.stuff[0].should.have.property('name');
        response.body.stuff[0].should.have.property('reason_for_linger');
        response.body.stuff[0].should.have.property('cleanliness')

        const foundThing = response.body.stuff.find(thing => 
        thing.name === 'Beer')


        foundThing.reason_for_linger.should.equal('Sometimes you jsut need a beer');
        foundThing.cleanliness.should.equal('Sparkling')
      })
      .catch(error => {
        throw error;
      })
    })
  })

})

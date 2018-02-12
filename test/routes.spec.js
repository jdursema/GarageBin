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
  let randomId;
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
  describe('POST /api/v1/stuff', () => {
    it('should add a new thing to the garage', () => {
      return chai.request(server)
      .post ('/api/v1/stuff')
      .send({
        name: 'Cheddar Rockets',
        reason_for_linger: 'noms',
        cleanliness: 'Dusty'
      })
      .then(response => {

        response.should.have.status(201)
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        randomId = response.body.id
      })
      .catch(error => {
        throw error;
      })
    })
    it('should not create a new candidate if the user forgot to include a parameter', () => {
      return chai.request(server)
      .post('/api/v1/stuff')
      .send({
        name: 'Cheddar Rockets',
        cleanliness: 'Dusty'
      })
      .then(response => {
      })
      .catch(error => {
        error.should.have.status(422)
        error.response.body.error.should.equal(
          'You are missing the required parameter reason_for_linger');
      })
    })
  })
  describe('PATCH /api/v1/stuff/:id', () => {
    it('should be able to patch a specific candidate', () => {

      return chai.request(server)

      .patch(`/api/v1/stuff/${randomId}`)
      .send({cleanliness: 'Sparkling'})
      .then(response => {
        response.should.have.status(202)
      })
      .catch(error => {
        throw error
      })
    })
    it('should return an error if the contribution does not exist', () => {
      return chai.request(server)
      .patch('/api/v1/stuff/99999999')
      .send({ cleanliness: 'Rancid'})
      .then(response => {
      })
      .catch(error => {
        error.should.have.status(404)
      })
    })
  })
})

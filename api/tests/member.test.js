var chai =  require('chai');
var  chaiHttp =  require('chai-http');
const  app = require('../index.js');

const { expect } = chai;

chai.use(chaiHttp);

describe('Member Routes', () => {
    describe('POST /member/add', () => {
        it('Should add a new member successfully', (done) => {
            chai.request(app)
                .post('/member/add')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    dateOfBirth: '2003-01-01',
                    gender: 'male',
                    phoneNumber: '0600000000',
                    country: 'autre'
                })
                .end((err, res) => {
                    if (err) {
                        // Handle errors, if any
                        done(err);
                    } else {
                        try {
                            expect(res).to.have.status(201);
                            // Add more assertions as needed
                            done(); // Call done() after all assertions are done
                        } catch (assertionError) {
                            // Handle assertion errors
                            done(assertionError);
                        }
                    }
                });
        });

        it('Should return an error for invalid member data', (done) => {
            chai.request(app)
                .post('/member/add')
                .send({
                    // Invalid data
                })
                .end((err, res) => {
                    if (err) {
                        // Handle errors, if any
                        done(err);
                    } else {
                        try {
                            expect(res).to.have.status(500);
                            // Add more assertions as needed
                            done(); // Call done() after all assertions are done
                        } catch (assertionError) {
                            // Handle assertion errors
                            done(assertionError);
                        }
                    }
                });
        });
    });
});

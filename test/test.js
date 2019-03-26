// const assert = require('assert');
const User = require('../models/user')
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const Restaurant = require('../models/restaurants');

// add a 'describle block' for restaurant tests
describe('Restaurant model', () => {
    it('should be able to grab an array of restaurants', async () => {
        //write the code you wish existed
        const arrayOfRestaurants = await Restaurant.getAll();
        expect(arrayOfRestaurants).to.be.instanceOf(Array);
    });
});



// describe('Sanity check', function (){
//     it('should be 2', function (){
//         // assert.equal(2, 1 + 1);
//         expect(1+1).to.equal(2);
//     });
// });

describe('Users model', function () {

    it('should be able to retrieve by id', async() => {
        const theUser = await User.getById(1);
        theUser.should.be.an.instanceOf(User);
        // theUser.should.have.length(1);
    });
    it('should error if no user by id', async ()=> {
        const theUser = await User.getById(27645);
        expect(theUser).to.be.null;
    });
    it('should update the user', async() => {
        // grab a user with id 2
        const theUser = await User.getById(2);
        // update the email
        theUser.email = "new@new.com";
        // save the user
        theUser.save()
        .then(async (report) => {
        // re-grab the user with id 2
        const alsoTheUser = await User.getById(2);
        // expect the email to be equal to the new value
        expect(alsoTheUser.email).to.equal('new@new.com');
    });
});
});
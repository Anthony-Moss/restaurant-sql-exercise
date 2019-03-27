// const assert = require('assert');
const User = require('../models/user')
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const Restaurant = require('../models/restaurants');
const Review = require('../models/reviews');

// add a 'describle block' for restaurant tests
describe('Restaurant model', () => {
    it('should be able to grab an array of restaurants', async () => {
        //write the code you wish existed
        const arrayOfRestaurants = await Restaurant.getAll();
        expect(arrayOfRestaurants).to.be.instanceOf(Array);
    });
    // it('should be able to grab an integer of reviews per restaurant', async () =>{
        
    // })
});



// describe('Sanity check', function (){
//     it('should be 2', function (){
//         // assert.equal(2, 1 + 1);
//         expect(1+1).to.equal(2);
//     });
// });

describe('User model', function () {

    it('should be able to retrieve by id', async() => {
        const theUser = await User.getById(1);
        theUser.should.be.an.instanceOf(User);
        // theUser.should.have.length(1);
    });
    it('should error if no user by id', async ()=> {
        const theUser = await User.getById(27645);
        expect(theUser).to.be.null;
    });
    it('should update the user', async () => {
        const theUser = await User.getById(1);
        theUser.email = 'new@new.com';
        await theUser.save();

        // re-grab the user with id 2
        const alsoTheUser = await User.getById(2);
        // // expect the email to be equal to the new value
        expect(theUser.email).to.equal('new@new.com');
    });
    it('should should not have the same email after updating it', async() => {
        // grab a user with id 2
        const theUser = await User.getById(2);
        //grab the urrent value for the email field
        const theOldEmail = theUser.email;
        // update the email
        //using the unix timestamp as part of the address
        const theNewEmail = `new${new Date().getTime()}@email.com`;
        theUser.email = theNewEmail;
        // save the user
        await theUser.save();
        // re-grab the user with id 2
        const alsoTheUser = await User.getById(2);
        // expect the email to be equal to the new value
        expect(alsoTheUser.email).not.be.to.equal(theOldEmail);
        expect(alsoTheUser.email).to.equal(theNewEmail);
    });
});

describe('Review model', () => {
    //Can I get one review
    it('should be able to retrieve a review by id', async () => {
        const thatReview = await Review.getById(2);
        expect(thatReview).to.be.an.instanceOf(Review);
    });
    //Can I get all reviews
    it('should be able to retrieve all reviews', async () => {
        const aBunchOfReviews = await Review.getAll();
        expect(aBunchOfReviews).to.be.an.instanceOf(Array);
        //and make sure each of them is an array
        //Use plain for loop, so that the exception does not
        //get swallowed by a foreach callback
        for (let i=0; i<aBunchOfReviews.length; i++) {
            expect(aBunchOfReviews[i]).to.be.an.instanceOf(Review);
        }
    });
    
});

describe('Users and Reviews', () => {
    it('a user instance should be able to retrieve all their reviews', async() =>{
        //grab a user by id
        const theUser = await User.getById(1);
        // then get all their reviews
        const theReviews = await theUser.getReviews();
        // confirm that their reviews are in an array
        expect(theReviews).to.be.an.instanceOf(Array);
        // and that the array is the correct length
        expect(theReviews).to.have.lengthOf(2);
        // and that each one is an instance of Review
        for (let i=0; i<theReviews.length; i++) {
            expect(theReviews[i]).to.be.an.instanceOf(Review);
        }
    })
});

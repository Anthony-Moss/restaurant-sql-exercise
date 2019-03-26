const db = require('./conn');

function getUserById(theId) {
return db.any(`select * from users where id=${theId}`)
    // .then(function(data){
    //     console.log(data);
    // })
    // .catch(function(error){
    //     //ERROR
    // });
}

function getReviewsByUserID(theId) {
    return db.any(`select count(reviews) as reviews from favorites where user_id=${theId}`)
    .then(function(data){
        console.log(data);
    })
    .catch(function(error){
        //ERROR
    });
}

function getFavoritesByUserID(theId) {
    return db.any(`select count(reviews) as reviews from favorites where user_id=${theId}`)
    .then(function(data){
        console.log(data);
    })
    .catch(function(error){
        //ERROR
    });
}

getUserById(1)
    .then(function (aUser) {
        // console.log(aUser);
        getReviewsByUserID(1);
        getUserById(2)
        getReviewsByUserID(2)
            .then(function (bUser) {
                // console.log(bUser);
                getUserById(3)
                getReviewsByUserID(3)
                    .then(function (cUser) {
                    })
            })
    })

// function getReviewsByUserID(theId) {
//     return db.any(`select reviews from favorites where user_id=${theId}`)
// }

async function main(){
    const user1 = await getUserById(1);
    console.log(user1);
}
main();

async function main2() {
    const idArray = [1, 2, 3];
    let infoArray = []; 
    idArray.forEach(async function (id) {
        const user = await getUserById(id);
        infoArray.push(user);
        return console.log(infoArray);
    });
}
main2();

function getRestaurantById(theId) {
    return db.any(`select * from restaurants where id=${theId}`)
}
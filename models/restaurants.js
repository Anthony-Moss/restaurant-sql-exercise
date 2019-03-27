//Bring in the dayabase conection
const db = require('./conn');

// declare the class
class Restaurant {
    //getAll is a static method
    static getAll() {
        //.any returns 0 or more results in an array
        // but that's async, so we `return` the call to db.any
        return db.any(`
        select * from restaurants
        `);
    }

    

    // static getById(id) {
    //     return db.one(`select count(content) as review_count from reviews restaurants_id=${id}`)
    //         .then((userData) => {
    //             console.log((userData));
    //             return userInatance
    //         })
    //         .catch(() => {
    //             return null; //signal an invalid value
    //     })
    // }

}

//export the class
module.exports = Restaurant;
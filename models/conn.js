// 
const pgp = require('pg-promise')({
    query: e => {
    console.log('QUERY: ', e.query);
    }  
});
const options = {
    host: 'localhost',
    database: 'restaurants-app'
};
// make a connection to the database specified by the options object
const db = pgp(options);

// db.any('select * from users where id=1')
//     .then(function(data) {
//         console.log(data);
//         // success;
//     })
//     .catch(function(error) {
//         // error;
//     });

module.exports = db
// Bring in the database connection.
const db = require('./conn');
const Review = require('./reviews');
const bcrypt = require('bcryptjs');

// Need a User class
// Classes should start with an uppercase letter
class User {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.password = password;
    }

    static add(userData) {
        // do an insert into the database
        // not using ${} because I don't want to interpolate
        // using ($) so that pg-promise does *safe* interpolation
        return db.one(`
            insert into users 
                (first_name, last_name, email, password)
            values 
                ($1, $2, $3, $4)
            returning id
        `, [userData.first_name, userData.last_name, userData.email, userData.password])
        .then((data) => {
            console.log("you did the thing! good job.");
            console.log(`new user id is ${data.id}`);
            return data.id;
        })
        // and return the id of the new user
    }

    static getAll() {
        return db.any(`select * from users`);
    }
    // "static mean that the function is something the function can do, but the instance cannot
    static getById(id) {
        return db.one(`select * from users where id=${id}`)
            .then((userData) => {
                const userInatance = new User(
                    userData.id,
                    userData.first_name,
                    userData.last_name,
                    userData.email,
                    userData.password
                    );
                return userInatance
            })
            .catch(() => {
                return null; //signal an invalid value
        })
    }

    static update(id, userData) {
        return db.result(`
            update users set 
                first_name = $1, 
                last_name = $2, 
                email = $3, 
                password = $4
            where id=$5
        `, [userData.first_name, 
            userData.last_name, 
            userData.email, 
            userData.password,
            id]);
    }

    static deleteById(id) {
        return db.any(`delete from users where id=${id}`)
    }
// no "static" since this is an "instance method"
// (it belongs to the individual instance)
    save() {
    // use .result when you might want a report about how many rows got affected
        return db.result(`
        update users set
            first_name='${this.firstName}',
            last_name='${this.lastName}',
            email='${this.email}',
            password='${this.password}'
        where id=${this.id}
        `);
    }

    setPassword(newPassword) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        this.password = hash;
    }

    checkPassword(aPassword) {
        return bcrypt.compareSync(aPassword, this.password);

    }
    getReviews() {
        return db.any(`select * from reviews where user_id=${this.id}`)
            .then((arrayOfReviewData) => {
                const arrayOfReviewInstances = [];
                
                arrayOfReviewData.forEach((data) => {
                    const newInstance = new Review(
                        data.id,
                        data.score,
                        data.content,
                        data.restaurant_id,
                        data.user_id
                    )
                    arrayOfReviewInstances.push(newInstance);
                });

                return arrayOfReviewInstances;
            });
    }
}

// User.getById(1)
// .then((user)=> {
//     console.log(user);
// });

// export my User model
module.exports = User;
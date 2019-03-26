// Bring in the database connection.
const db = require('./conn');

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
}

User.getById(1)
.then((user)=> {
    console.log(user);
});

// export my User model
module.exports = User;
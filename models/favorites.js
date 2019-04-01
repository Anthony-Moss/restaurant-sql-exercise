const db = require('./conn');

class favorites {
    constructor(id, user_id, restaurant_id){
        //I want this.<whatevs> to  be camelCase
        //because my properties should follow JavaScript style
        this.id = id;
        this.userId = user_id;
        this.restaurantId = restaurant_id;
    }

    static getAll(id) {
        return db.any(`
        select * from Favorites
        `);
    }
}
module.exports = favorites;
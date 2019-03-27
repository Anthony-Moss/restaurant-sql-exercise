const db = require('./conn')

class  Review {
    constructor(id, score, content, restaurant_id, user_id){
        //I want this.<whatevs> to  be camelCase
        //because my properties should follow JavaScript style
        this.id = id;
        this.score = score;
        this.content = content;
        this.restaurantId = restaurant_id;
        this.userId = user_id;
    }

    static getById(id){
        return db.one(`select * from reviews where id=${id}`)
            .then((reviewData) => {
                return new Review(
                    reviewData.id,
                    reviewData.score,
                    reviewData.content,
                    reviewData.restaurant_id,
                    reviewData.user_id
                );
            });
    }

    static getAll() {
        return db.any(`select * from reviews`)
            .then((arrayOfReviews) => {
                return arrayOfReviews.map((reviewData) => {
                    const aReview = new Review(
                        reviewData.id,
                        reviewData.score,
                        reviewData.content,
                        reviewData.restaurant_id,
                        reviewData.user_id
                    );
                    // console.log(aReview);
                    return aReview;
                });
            });
    }
}

module.exports = Review;
const User = require('./user');

class controller {
    static log(req, res, next) {
        console.log(`They asked for ${req.url}`)
        next();
    }
    static async checkUserInfo(req, res, next) {
        const theUser =  await User.getById(req.params.id);
        res.json(theUser);
    }
    
    static async checkAllUsers(req, res) {
        const allUsers = await User.getAll();  
        res.json(allUsers);
        // next();
    }
    
    static async createNewUser(req, res, next) {
        res.json(req.body);
        await User.add(req.body);
    }
    
    static async updateUser(req, res, next) {
        const updatedInfo = await User.update(req.params.id, req.body);
        res.json(updatedInfo);
    }
    
    static async deleteUser(req, res, next) {
        let userInfo = await User.deleteById(req.params.id);
        res.json(userInfo);
    }
}
    
    // async function checkAllRestaurants(req, res, next) {
    //     const allRestaurants = await Restaurant.getAll();
    //     // const restaurantJSON = JSON.stringify(allRestaurants);
    //     // res.json will do 2 things:
    //     // 1. it converts your javaScript Object or Array to a JSON String
    //     // 2. it puts the correct Content-Type header on the response
    //     res.json(allRestaurants);
    // };


module.exports = controller;
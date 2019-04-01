const express = require('express'); // Bring in express library
const app = express(); // Create a new express app

const http = require('http');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

// Import my model class
const Restaurant = require('./models/restaurants');
const User = require('./models/user');
const Reviews = require('./models/reviews')

app.get('/restaurants', async (req, res) => {
    const allRestaurants = await Restaurant.getAll();
    // const restaurantJSON = JSON.stringify(allRestaurants);
    // res.json will do 2 things:
    // 1. it converts your javaScript Object or Array to a JSON String
    // 2. it puts the correct Content-Type header on the response
    res.json(allRestaurants);
});

app.get('/users', async (req, res) => {
    const allUsers = await User.getAll();  
    res.json(allUsers);
});
app.get('/users/:id', async (req, res) =>{
    // how to grab a piece out of req.params (or any object):
    // const id = req.params.id;
    // this is known as "destructuring"
    const {id} = req.params;
    const theUser =  await User.getById(req.params.id);
    res.json(theUser);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const http = require('http');

const hostname = '127.0.0.1';

const port = 3000;

const Restaurant = require('./models/restaurants');
const Users = require('./models/user');


// "helper function" === 'middleware'
// aka "request handler"
const server = http.createServer(async (req, res) => {
    const method = req.method;
    const parts = req.url.split("/");
    console.log(req);

    res.statusCpde = 200;
    res.setHeader('Content-Type', 'application/json');

    // if req.url is "/restaurants", send them all restaurants
    //if it's "/user", send a list of users
    //else if it doesnt match either, send a welcome message
    if (req.url === "/restaurants") {
        // const method = req.method;
        // const parts = req.url.split("/");
        console.log(req);
        if (method === "GET") {
            if (parts.length === 2) {
                const allRestaurants = await Restaurant.getAll();
                const restaurantJSON = JSON.stringify(allRestaurants);
                res.end(restaurantJSON);
            } else if (parts.length === 3) {
                const restaurantId = parts[2];
                const theRestaurant = await Users.getById(restaurantId);
                const restaurantJSON = JSON.stringify(theRestaurant);
                res.end(restaurantJSON);
            } else {
                res.status = 404;
                res.end('Resource not found.');
            } 
        } else if (method === "POST") {
            res.end('{ message: "it sounds like you wanna create"}');
        } else if (method === "PUT") {
            res.end('{ message: "you wanna update, dont you"}');
        } else if (method === "DELETE") {
            res.end('{ message: "rm the user"}');
        }
    } else if (req.url.startsWith ("/users")) {
        if (method === "GET") {
            if (parts.length === 2) {
                const allUsers = await Users.getAll();
                const userJSON = JSON.stringify(allUsers);
                res.end(userJSON);
            } else if (parts.length === 3) {
                const userId = parts[2];
                const theUser = await Users.getById(userId);
                const userJSON = JSON.stringify(theUser);
                res.end(userJSON);
            } else {
                res.status = 404;
                res.end('Resource not found.');
            }
        } else if (method === "POST") {
            res.end('{ message: "it sounds like you wanna create"}');
        } else if (method === "PUT") {
            res.end('{ message: "you wanna update, dont you"}');
        } else if (method === "DELETE") {
            res.end('{ message: "rm the user"}');
        }
    } else {
        res.end(`{message: "Thank you for yout patronage. Plz send bitcoin."}`);
    }   
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});
var express = require('express');
var router = express.Router();

//Used for routes that must be authenticated.
function isAuthenticated(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects

    //allow all get request methods
    if (req.method === "GET" || req.isAuthenticated()) {
        console.log('Authenticated or GET request!');
        return next();
    }

    // if the user is not authenticated then redirect him to the login page
    console.log('Redirecting to login page...');
    return res.redirect('/#login');
};

//Register the authentication middleware
router.use('/posts', isAuthenticated);

// api for all posts
router.route('/posts')

    // return all posts
    .get(function (req, res) {

        // temporary solution
        res.send({ message: "TODO return all posts" });
    })

    // create a new post
    .post(function (req, res) {

        // temporary solution
        res.send({ message: "TODO Create a new post" });
    });

// api for a specfic post
router.route('/posts/:id')

    // return a particular post
    .get(function (req, res) {

        res.send({ message: 'TODO return a post with ID ' + req.params.id });
    })

    // update existing post
    .put(function (req, res) {

        res.send({ message: 'TODO modify a post with ID ' + req.params.id });
    })

    // delete existing post
    .delete(function (req, res) {

        res.send({ message: 'TODO delete a post with ID ' + req.params.id });
    });

module.exports = router;
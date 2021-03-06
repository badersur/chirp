var mongoose = require('mongoose');
var Post = mongoose.model('Post');
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
        Post.find(function (err, posts) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(posts);
        });
    })

    // create a new post
    .post(function (req, res) {

        var post = new Post();
        post.text = req.body.text;
        post.created_by = req.body.created_by;
        post.save(function (err, post) {
            if (err) {
                return res.send(500, err);
            }
            return res.json(post);
        });
    });

// api for a specfic post
router.route('/posts/:id')

    // return a particular post
    .get(function (req, res) {
        Post.findById(req.params.id, function (err, post) {
            if (err) {
                return res.send(err);
            }
            return res.json(post);
        });
    })

    //update specified post
    .put(function (req, res) {
        Post.findById(req.params.id, function (err, post) {
            if (err) {
                console.log('Error:');
                console.log(err);
                return res.send(err);
            }

            post.created_by = req.body.created_by;
            post.text = req.body.text;

            post.save(function (err, post) {
                if (err) {
                    return res.send(err);
                }
                return res.json(post);
            });
        });
    })

    //delete the post
    .delete(function (req, res) {
        Post.remove({
            _id: req.params.id
        }, function (err) {
            if (err) {
                return res.send(err);
            }
            return res.json("deleted :(");
        });
    });

module.exports = router;
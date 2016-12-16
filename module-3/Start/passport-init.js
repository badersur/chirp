var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
//temporary data store
var users = {};
module.exports = function (passport) {

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function (user, done) {
        console.log('serializing user:', user.username);
        return done(null, user.username);
    });

    //Desieralize user will call with the unique id provided by serializeuser
    passport.deserializeUser(function (username, done) {
        console.log('deserializing user:', username);
        return done(null, users[username]);
    });

    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {

            if (!users[username]) {
                console.log('User Not Found with username ' + username);
                return done('user not found', false);
            }

            if (!isValidPassword(users[username], password)) {
                console.log('Invalid username/password');
                return done('Invalid username/password', false);
            }

            console.log('sucessfully signed in');
            return done(null, users[username]);
        }
    ));

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, username, password, done) {

            // check if user already exists
            if (users[username]) {
                return done('username already taken', false);
            }

            // add user to db
            users[username] = {
                username: username,
                password: createHash(password)
            };

            console.log(users[username].username + ' Registration successful');
            return done(null, users[username]);
        })
    );

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};
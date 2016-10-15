var User = require('../models/user');

 module.exports = function(app, express, jwt) {
   // get an instance of the router for api routes
   var apiRoutes = express.Router();

   // route to show a random message (GET http://localhost:8080/)
   apiRoutes.get('/', function(req, res) {
     res.json({ message: 'Welcome to the coolest API on earth!' });
   });

  // route to authenticate a user (POST http://localhost:8080/authenticate)
  apiRoutes.post('/authenticate', function(req, res) {
      // find the user
      User.findOne({
        email: req.body.email
      }, function(err, user) {

        if (err) throw err;

        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

          // check if password matches
          if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {

            // if user is found and password is right
            // create a token
            var token = jwt.sign(user, app.get('superSecret'), {
              expiresIn: 60*60*24 // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }

        }

      });
    });

    // route middleware to verify a token
    apiRoutes.use(function(req, res, next) {

      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];

      // decode token
      if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
        });

      } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

      }
    });

    // route to return all users (GET http://localhost:8080/users)
    apiRoutes.get('/users', function(req, res) {
      User.find({}, function(err, users) {
        res.json(users);
      });
    });

   // apply the routes to our application with the prefix /api
   app.use('/', apiRoutes);
 };

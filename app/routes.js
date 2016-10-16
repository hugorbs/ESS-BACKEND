var UserController = require('../controllers/userController');
var mongoose       = require('mongoose');
var User           = mongoose.model('user');

 module.exports = function(app, express, jwt) {
     // get an instance of the router for api routes
     var apiRoutes = express.Router();

     // route to show a message (GET http://localhost:8080/)
     apiRoutes.get('/', function(req, res) {
       res.json({ message: 'Welcome!' });
     });

     apiRoutes.post('/users', function(req, res) {
       UserController.add(app.get('superSecret'), req, res);
     });

    // route to authenticate a user (POST http://localhost:8080/authenticate)
    apiRoutes.post('/login', function(req, res) {
      UserController.login(app.get('superSecret'), req, res);
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

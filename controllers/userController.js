var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('user');

module.exports.login = function(secret, req, res) {
  passport.authenticate('user', function(err, user, info){
    var token;
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt(secret);

      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports.add = function(secret, req, res) {
  console.log('add called');
  var user = new User();

  user.setFields(req);

  user.save(function(err) {
    var token = user.generateJwt(secret);
    res.status(200);
    res.json({
      "token" : token
    });
  });
};

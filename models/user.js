// get an instance of mongoose
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// set up a mongoose model and pass it using module.exports
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    admin: Boolean,
    hash: String,
    salt: String
});

function empty(str){
    if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g,"") === ""){
        return true;
    } else {
        return false;
    }
}

userSchema.methods.setFields = function (req) {
  this.name = req.body.name;
  this.email = req.body.email;
  this.admin = req.body.admin;

  var password = req.body.password;

  if(!empty(password)) {
    this.setPassword(password);
  }
}

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function(secret) {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    admin: this.admin,
    }, secret,
    {
      expiresIn : 60*60*24
    });
};

mongoose.model('user', userSchema);

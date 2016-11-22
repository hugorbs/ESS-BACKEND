var mongoose = require('mongoose');
var User = mongoose.model('user');
var Teacher = mongoose.model('teacher');
var Machine = mongoose.model('machine');
var Subject = mongoose.model('subject');
var SubjectUser = mongoose.model('subjectUser');

module.exports.setup = function(req, res){
  var user = new User();
  user.name = 'Hugo Baia';
  user.email = 'hugotpa@gmail.com';
  user.admin = false;
  user.setPassword('password');
  user.save();

  var kiev = new Teacher();
  kiev.name = 'Kiev Gama';
  kiev.save();

  var robson = new Teacher();
  robson.name = 'Robson Fidalgo';
  robson.save();

  var machine = new Machine();
  machine.classroom = 'E114';
  machine.save();

  var ess = new Subject();
  ess.name = 'ESS';
  ess.teacherId = kiev._id;
  ess.save();

  var gdi = new Subject();
  gdi.name = 'GDI';
  gdi.teacherId = robson._id;
  gdi.save();

  var subjectUser = new SubjectUser();
  subjectUser.subjectId = ess._id;
  subjectUser.userId = user._id;
  subjectUser.save();

  res.status(200);
  res.send('OK');
}

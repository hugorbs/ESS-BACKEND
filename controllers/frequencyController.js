var mongoose = require('mongoose');
var Subject = mongoose.model('subject');
var Frequency = mongoose.model('frequency');

module.exports.register = function(req, res){
  var frequency = new Frequency();
  frequency.userId = req.body.userId;
  frequency.subjectId = req.body.subjectId;
  frequency.date = req.body.date;

  frequency.save();

  res.status(200);
  res.send('OK');
}

module.exports.getSubjects = function(req, res){
  Subject.find({}, {"name":1, "_id":0}, function(err, subjects) {
    if (!err) {
      res.json(subjects);
    } else {
      res.json(err);
    }
  });
}

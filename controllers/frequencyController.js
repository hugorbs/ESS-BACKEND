var mongoose = require('mongoose');
var Subject = mongoose.model('subject');
var Frequency = mongoose.model('frequency');

module.exports.register = function(req, res){
  var frequency = new Frequency();
  frequency.userId = req.body.userId;
  frequency.machineId = req.body.machineId;
  frequency.date = req.body.date;

  frequency.save();

  res.status(200);
  res.send('OK');
}

module.exports.getFrequency = function(req, res){
  var mySubjects;
  Subject.find({}, {"name":1, "_id":0}, function(err, subjects) {
    if (!err) {
      mySubjects = subjects;
      res.json(subjects);
    } else {
      res.json(err);
    }
  });
}

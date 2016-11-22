var mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
    name: String,
    teacherId: String
});

mongoose.model('subject', subjectSchema);

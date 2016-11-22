var mongoose = require('mongoose');

var classSchema = new mongoose.Schema({
    teacherId: String,
    subjectId: String,
    date: Date
});

mongoose.model('class', classSchema);

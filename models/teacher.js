var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
    name: String
});

mongoose.model('teacher', teacherSchema);

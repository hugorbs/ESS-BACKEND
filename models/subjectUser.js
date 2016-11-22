var mongoose = require('mongoose');

var subjectUserSchema = new mongoose.Schema({
    subjectId: String,
    userId: String
});

mongoose.model('subjectUser', subjectUserSchema);

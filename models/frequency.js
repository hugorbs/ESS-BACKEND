var mongoose = require('mongoose');

var frequencySchema = new mongoose.Schema({
    userId: String,
    subjectId: String,
    date: Date
});

mongoose.model('frequency', frequencySchema);

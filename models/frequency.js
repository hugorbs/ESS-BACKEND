var mongoose = require('mongoose');

var frequencySchema = new mongoose.Schema({
    userId: String,
    machineId: String,
    date: Date
});

mongoose.model('frequency', frequencySchema);

var mongoose = require('mongoose');

var machineSchema = new mongoose.Schema({
    classroom: String
});

mongoose.model('machine', machineSchema);

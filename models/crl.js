var mongoose = require('mongoose'),
    CrlSchema = new mongoose.Schema({
        path: {
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    });

module.exports = mongoose.model('Crl', CrlSchema);
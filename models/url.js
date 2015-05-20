var mongoose = require('mongoose'),
    UrlSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Url', UrlSchema);
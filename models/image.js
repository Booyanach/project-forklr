var mongoose = require('mongoose'),
    ImageSchema = new mongoose.Schema({
        image: {
            data: Buffer,
            contentType: String
        },
        type: {
            type: String,
            required: true
        }
    });

module.exports = mongoose.model('Image', ImageSchema);
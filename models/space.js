module.exports = function(app) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var SpaceSchema = Schema({
        company: {
            type: Schema.ObjectId,
            ref: "Company",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: String,
        type: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    });

    var Space = mongoose.model('Space', SpaceSchema);
    return Space;
};
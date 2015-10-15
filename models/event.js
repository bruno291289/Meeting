module.exports = function(app) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var EventSchema = Schema({
        owner: {
            type: Schema.ObjectId,
            ref: "User",
            required: true
        },
        space: {
            type: Schema.ObjectId,
            ref: "Space",
            required: true
        },
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
        accepted: {
            type: Boolean,
            default: false
        },
        confirmed: {
            type: Boolean,
            default: false
        },
        price: {
            type: Number
        },
        description: String
    });

    var Event = mongoose.model('Event', EventSchema);
    return Event;
};
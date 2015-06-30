module.exports = function(app) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var CompanySchema = Schema({
        owner: {type: Schema.ObjectId, ref: "User"},
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            street: String,
            zipcode: String,
            number: Number,
            neighborhood: String,
            city: String,
            country: String
        },
        phones: [{
            number: String,
            type: String
        }]
    });

    var Company = mongoose.model('Company', CompanySchema);
    return Company;
};
module.exports = function(app) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var CompanySchema = Schema({
        owner: {type: Schema.ObjectId, ref: "User", required: true, unique: true},
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
            description: String
        }],
        spaces: [{
            title:{type: String, required:true},
            description: String,
            filepaths: [{path: String}]
        }]
    });

    var Company = mongoose.model('Company', CompanySchema);
    return Company;
};
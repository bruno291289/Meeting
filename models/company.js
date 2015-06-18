module.exports = function(app) {
    var Schema = require('mongoose').Schema;

    var companySchema = Schema({
        name: {
            type: String,
            required: true
        },
        address: [{
            street: String,
            neighbourhood: String,
            city: String
        }],
        phones: [{
            number: String
        }],
    });

    return companySchema;
};
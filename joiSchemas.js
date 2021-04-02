const Joi = require('joi');


const addressSchema = Joi.object({

    street: Joi.string().required(), //consider use of client side regex too
    number: Joi.number().required().positive().integer(),
    postcode: Joi.number().positive().integer().empty(''),
    city: Joi.string().required(),
    state: Joi.string().empty(''),
    country: Joi.string().required()

}).required();

const fountainSchema = Joi.object({

    address: addressSchema
});


module.exports.addressSchema = addressSchema

module.exports.fountainSchema = fountainSchema
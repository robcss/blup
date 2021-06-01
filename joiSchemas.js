const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html')

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})

const Joi = BaseJoi.extend(extension)

const addressSchema = Joi.object({

    street: Joi.string().required().escapeHTML(), //consider use of client side regex too
    number: Joi.number().required().positive().integer(),
    postcode: Joi.number().positive().integer().empty(''),
    city: Joi.string().required().escapeHTML(),
    state: Joi.string().empty('').escapeHTML(),
    country: Joi.string().required().escapeHTML()

}).required();

const fountainSchema = Joi.object({

    address: addressSchema,
    deleteImages: Joi.array()
});


const commentSchema = Joi.object({

    body: Joi.string().required().escapeHTML()
});


const reportSchema = Joi.object({

    title: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML()
});

module.exports.addressSchema = addressSchema

module.exports.fountainSchema = fountainSchema

module.exports.commentSchema = commentSchema

module.exports.reportSchema = reportSchema
const BaseJoi = require("joi")
const sanitizeHTML = require("sanitize-html")

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!"
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHTML(value, {
          allowedTags: [],
          allowedAttributes: {}
        })
        if (clean !== value) return helpers.error("string.escapeHTML", {value})
        return clean
      }
    }
  }
})

const Joi = BaseJoi.extend(extension)

module.exports.monumentSchema = Joi.object({
  monument: Joi.object({
    name: Joi.string().required().escapeHTML(),
    price: Joi.number().required().min(0),
    city: Joi.string().required().escapeHTML(),
    country: Joi.string().required().escapeHTML(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    description: Joi.string().required().escapeHTML(),
  }).required(),
  deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required().escapeHTML()
  }).required()
})

const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);
const pattern = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}'

const ChapaValidation = {

  index: {
    query: {
      zona: Joi.string().alphanum().length(24).required()
    },
  },
  show: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    query: {
      zona: Joi.string().alphanum().length(24).required()
    },
  },
  store: {
    query: {
      zona: Joi.string().alphanum().length(24).required()
    },
    body: {
      nome: Joi.string().required()
    }
  },

  update: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    query: {
      zona: Joi.string().alphanum().length(24).required()
    },
    body: {
      nome: Joi.string().required()
    }
  },

  remove: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    query: {
      zona: Joi.string().alphanum().length(24).required()
    },
  },
};

module.exports = {
  ChapaValidation
};
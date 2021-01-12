const Joi = require('joi');

const FormacoesValidation = {

  store: {
    body: {
      nome: Joi.string().required()
    }
  },
  update: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    body: {
      nome: Joi.string().optional()
    }
  },
  remove: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  }
};

module.exports = { FormacoesValidation }
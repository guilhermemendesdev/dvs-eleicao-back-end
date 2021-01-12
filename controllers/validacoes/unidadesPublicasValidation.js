const Joi = require('joi');

const UnidadesPublicasValidation = {

  store: {
    body: {
      descricao: Joi.string().required(),
      status: Joi.string().required(),
      nome__responsavel: Joi.string().required(),
      email__responsavel: Joi.string().email().required(),
      telefone__responsavel: Joi.string().required(),
      email__unidade: Joi.string().email().required(),
    }
  },
  update: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    body: {
      descricao: Joi.string().optional(),
      status: Joi.string().optional(),
      nome__responsavel: Joi.string().optional(),
      email__responsavel: Joi.string().email().optional(),
      telefone__responsavel: Joi.string().optional(),
      email__unidade: Joi.string().email().optional(),
      endereco: Joi.object({
        local: Joi.string().required(),
        numero: Joi.string().required(),
        complemento: Joi.string(),
        bairro: Joi.string().required(),
        cidade: Joi.string().required(),
        estado: Joi.string().required(),
        CEP: Joi.string().required()
      }).optional(),
    }
  },
  remove: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  }
};

module.exports = { UnidadesPublicasValidation }
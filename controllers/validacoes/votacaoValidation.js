const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);
const pattern = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}'

const VotacaoValidation = {

  showAdm: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
  finalizarVotacao: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    body: {
      status: Joi.string().required(),
      candidato: Joi.string().alphanum().length(24).required(),
      porcentagem: Joi.number().required(),
      confirmado: Joi.boolean().required()
    }
  },
  update: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    body: {
      zona_eleitoral: Joi.string().optional(),
      candidatos: Joi.array().items(Joi.string().alphanum().length(24).optional()).optional()
    }
  },
};

module.exports = {
  VotacaoValidation
};
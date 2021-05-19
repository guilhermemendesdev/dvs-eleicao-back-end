const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);
const pattern = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}'

const ZonaValidation = {

  showAdm: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
  store: {
    body: {
      nome: Joi.string().required(),
      coordenador_geral: Joi.string().required(),
      coordenador_pedagogico: Joi.string().required(),
      diretor: Joi.string().required(),
    }
  },

  update: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    body: {
      nome: Joi.string().optional(),
      coordenador_geral: Joi.string().optional(),
      coordenador_pedagogico: Joi.string().optional(),
      diretor: Joi.string().optional(),
    }
  },
  remove: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
};

module.exports = {
  ZonaValidation
};
const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

const InscricoesValidation = {
  index: {
    query: {
      offset: Joi.number(),
      limit: Joi.number()
    }
  },
  search: {
    params: {
      search: Joi.string().required()
    }
  },
  showAdm: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
  updateAdm: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    body: {
      nome: Joi.string().optional(),
      password: Joi.string().optional(),
      cpf: Joi.string().length(14).optional(),
      dataDeNascimento: Joi.date().format("YYYY-MM-DD").raw().optional(),
      sexo: Joi.string().optional(),
      ocupacao: Joi.string().optional(),
      endereco: Joi.object({
        local: Joi.string().required(),
        numero: Joi.string().required(),
        complemento: Joi.string(),
        bairro: Joi.string().required(),
        cidade: Joi.string().required(),
        estado: Joi.string().required(),
        CEP: Joi.string().required()
      }).optional(),
      celular: Joi.string().optional(),
      recado: Joi.string().optional(),
      desc__experiencia: Joi.string().optional(),
    }
  },
  store: {
    body: {
      nome: Joi.string().required(),
      password: Joi.string().required(),
      cpf: Joi.string().length(14).required(),
      dataDeNascimento: Joi.date().format("YYYY-MM-DD").raw().required(),
      sexo: Joi.string().required(),
      ocupacao: Joi.string().required(),
      endereco: Joi.object({
        local: Joi.string().required(),
        numero: Joi.string().required(),
        complemento: Joi.string(),
        bairro: Joi.string().required(),
        cidade: Joi.string().required(),
        estado: Joi.string().required(),
        CEP: Joi.string().required()
      }).required(),
      celular: Joi.string().required(),
      recado: Joi.string().required(),
      desc__experiencia: Joi.string().optional(),
    }
  },
  update: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    body: {
      nome: Joi.string().optional(),
      password: Joi.string().optional(),
      cpf: Joi.string().length(14).optional(),
      dataDeNascimento: Joi.date().format("YYYY-MM-DD").raw().optional(),
      sexo: Joi.string().optional(),
      ocupacao: Joi.string().optional(),
      endereco: Joi.object({
        local: Joi.string().required(),
        numero: Joi.string().required(),
        complemento: Joi.string(),
        bairro: Joi.string().required(),
        cidade: Joi.string().required(),
        estado: Joi.string().required(),
        CEP: Joi.string().required()
      }).optional(),
      celular: Joi.string().optional(),
      recado: Joi.string().optional(),
      desc__experiencia: Joi.string().optional(),
    }
  },
  updateFoto: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
  updateFrente: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
  updateVerso: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
};

module.exports = {
  InscricoesValidation
};
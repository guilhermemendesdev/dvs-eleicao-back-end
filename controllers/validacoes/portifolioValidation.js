const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

const PortifolioValidation = {
  index: {
    query: {
      offset: Joi.number(),
      limit: Joi.number()
    }
  },
  show: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
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
      tipo: Joi.string().required(),
      titulo: Joi.string().required(),
      resumo: Joi.string().required(),
      status: Joi.string(),
      telefone__responsavel: Joi.string().required(),
      idade__minima: Joi.string().required(),
      tipo__localizacao: Joi.string().required(),
      responsavel: Joi.string().required(),
      endereco: Joi.object({
        local: Joi.string().required(),
        numero: Joi.string().required(),
        complemento: Joi.string(),
        bairro: Joi.string().required(),
        cidade: Joi.string().required(),
        estado: Joi.string().required(),
        CEP: Joi.string().required()
      }).required(),
      data__ini__cand: Joi.date().format("YYYY-MM-DD").raw().required(),
      data__fim__cand: Joi.date().format("YYYY-MM-DD").raw().required(),
      data__ini__duracao: Joi.date().format("YYYY-MM-DD").raw().required(),
      data__fim__duracao: Joi.date().format("YYYY-MM-DD").raw().required(),
      ponto__coleta: Joi.string().required(),
      servico__voluntario: Joi.string().required(),
      tipo__campanha: Joi.string().required(),
    }
  },
  update: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    body: {
      tipo: Joi.string().optional(),
      titulo: Joi.string().optional(),
      resumo: Joi.string().optional(),
      status: Joi.string().optional(),
      telefone__responsavel: Joi.string().optional(),
      idade__minima: Joi.string().optional(),
      tipo__localizacao: Joi.string().optional(),
      responsavel: Joi.string().optional(),
      endereco: Joi.object({
        local: Joi.string().required(),
        numero: Joi.string().required(),
        complemento: Joi.string(),
        bairro: Joi.string().required(),
        cidade: Joi.string().required(),
        estado: Joi.string().required(),
        CEP: Joi.string().required()
      }).optional(),
      data__ini__cand: Joi.date().format("YYYY-MM-DD").raw().optional(),
      data__fim__cand: Joi.date().format("YYYY-MM-DD").raw().optional(),
      data__ini__duracao: Joi.date().format("YYYY-MM-DD").raw().optional(),
      data__fim__duracao: Joi.date().format("YYYY-MM-DD").raw().optional(),
      ponto__coleta: Joi.string().optional(),
      servico__voluntario: Joi.string().optional(),
      tipo__campanha: Joi.string().optional(),
    }
  },
  updateFotos: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
};

module.exports = {
  PortifolioValidation
};
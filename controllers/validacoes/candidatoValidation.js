const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);
const pattern = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}'

const CandidatoValidation = {

  showAdm: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    query: {
      zona: Joi.string().alphanum().length(24).required()
    }
  },
  showAll: {
    query: {
      zona: Joi.string().alphanum().length(24).required()
    }
  },
  search: {
    query: {
      zona: Joi.string().alphanum().length(24).required()
    }
  },
  store: {
    query: {
      zona: Joi.string().alphanum().length(24).required()
    },
    body: {
      dt_nascimento: Joi.date().format("YYYY-MM-DD").raw().required(),
      nome: Joi.string().required(),
      cpf: Joi.string().length(14).required(),
      email: Joi.string().email().required(),
      rg: Joi.string().required(),
      telefone: Joi.string().required(),
      cargo: Joi.string().required(),
      funcao: Joi.string().required(),
      graduacao: Joi.boolean().required(),
      curso_graduacao: Joi.string().optional().allow(''),
      pos_graduacao: Joi.boolean().required(),
      curso_pos_graduacao: Joi.string().optional().allow(''),
      mestrado: Joi.boolean().required(),
      curso_mestrado: Joi.string().optional().allow(''),
      doutorado: Joi.boolean().required(),
      curso_doutorado: Joi.string().optional().allow(''),
      curso_gestor: Joi.boolean().required(),
      obs_curso_gestor: Joi.string().optional().allow(''),
      outros_cursos: Joi.string().optional().allow(''),
      data_entrada_inst: Joi.string().required(),
      data_entrada_docencia: Joi.string().required(),
      endereco: Joi.object({
        cep: Joi.string().required(),
        rua: Joi.string().required(),
        complemento: Joi.string().required(),
        cidade: Joi.string().required(),
        uf: Joi.string().required(),
        bairro: Joi.string().required(),
        numero: Joi.string().required()
      }).required(),
      numero_candidato: Joi.string().required(),
    }
  },

  updateFoto: {
    query: {
      zona: Joi.string().alphanum().length(24).required()
    },
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },

  update: {
    query: {
      zona: Joi.string().alphanum().length(24).required()
    },
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    body: {
      nome: Joi.string().optional(),
      cpf: Joi.string().length(14).optional(),
      email: Joi.string().email().optional(),
      rg: Joi.string().optional(),
      cargo: Joi.string().optional(),
      funcao: Joi.string().optional(),
      graduacao: Joi.boolean().optional(),
      curso_graduacao: Joi.string().optional(),
      pos_graduacao: Joi.boolean().optional(),
      curso_pos_graduacao: Joi.string().optional(),
      mestrado: Joi.boolean().optional(),
      curso_mestrado: Joi.string().optional(),
      doutorado: Joi.boolean().optional(),
      curso_doutorado: Joi.string().optional(),
      curso_gestor: Joi.boolean().optional(),
      obs_curso_gestor: Joi.string().optional(),
      outros_cursos: Joi.string().optional(),
      tempo_modulacao: Joi.string().optional(),
      tempo_docencia: Joi.string().optional(),
      telefones: Joi.array().items(Joi.string()).optional(),
      endereco: Joi.object({
        cep: Joi.string().required(),
        rua: Joi.string().required(),
        complemento: Joi.string(),
        bairro: Joi.string().required(),
        cidade: Joi.string().required(),
        uf: Joi.string().required(),
        numero: Joi.string().required()
      }).optional(),
      dt_nascimento: Joi.date().format("YYYY-MM-DD").raw().optional()
    }
  },

  remove: {
    query: {
      zona: Joi.string().alphanum().length(24).required()
    },
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
};

module.exports = {
  CandidatoValidation
};
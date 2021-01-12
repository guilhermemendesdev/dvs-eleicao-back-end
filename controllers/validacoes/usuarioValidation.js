const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

const UsuarioValidation = {
    show: {
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    },
    store: {
        body: {
            nome: Joi.string().required(),
            cpf: Joi.string().length(14).required(),
            password: Joi.string().required(),
        }
    },
    update: {
        body: {
            nome: Joi.string().optional(),
            cpf: Joi.string().length(14).optional(),
            password: Joi.string().optional()
        }
    },
    login: {
        body: {
            cpf: Joi.string().length(14).required(),
            password: Joi.string().required()
        }
    }
};

module.exports = {
    UsuarioValidation
};
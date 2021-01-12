const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

const CandidaturaValidation = {
  showAdmin: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
  search: {
    query: {
      offset: Joi.number(),
      limit: Joi.number()
    },
    params: {
      search: Joi.string().required()
    }
  },
  removeAdmin: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
  showCarrinhoPedidoAdmin: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
  index: {
    query: {
      offset: Joi.number().required(),
      limit: Joi.number().required(),
      loja: Joi.string().alphanum().length(24).required()
    }
  },
  show: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
  remove: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
  showCarrinhoPedido: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },
};

module.exports = { CandidaturaValidation };
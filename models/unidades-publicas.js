const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnidadesPublicasSchema = Schema({
  descricao: { type: String, required: true },
  status: { type: String, required: true },
  nome__responsavel: { type: String, required: true },
  email__responsavel: { type: String, required: true },
  telefone__responsavel: { type: String, required: true },
  email__unidade: { type: String, required: true },
  endereco: {
    type: {
      local: { type: String, required: true },
      numero: { type: String, required: true },
      complemento: { type: String },
      bairro: { type: String, required: true },
      cidade: { type: String, required: true },
      estado: { type: String, required: true },
      CEP: { type: String, required: true }
    },
    required: true
  },
  deletado: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

module.exports = mongoose.model("UnidadesPublicas", UnidadesPublicasSchema);
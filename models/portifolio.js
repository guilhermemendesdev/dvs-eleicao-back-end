const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

const PortifolioSchema = Schema({
  tipo: { type: String, required: true },
  titulo: { type: String, required: true },
  resumo: { type: String, required: true },
  status: { type: String, default: 'Em andamento' },
  telefone__responsavel: { type: String, required: true },
  idade__minima: { type: String, required: true },
  tipo__localizacao: { type: String, required: true },
  responsavel: { type: String, required: true },
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
  fotos: { type: Array, default: [] },
  data__ini__cand: { type: Date, required: true },
  data__fim__cand: { type: Date, required: true },
  data__ini__duracao: { type: Date, required: true },
  data__fim__duracao: { type: Date, required: true },
  ponto__coleta: { type: String, required: true },
  servico__voluntario: { type: String, required: true },
  tipo__campanha: { type: String, required: true },
  disp__horarios: { type: [{ type: String }] },
  deletado: {
    type: Boolean,
    default: false
  },
  desativado: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

PortifolioSchema.plugin(mongoosePaginate);
PortifolioSchema.index({ titulo: "text" });
module.exports = mongoose.model("Portifolio", PortifolioSchema);
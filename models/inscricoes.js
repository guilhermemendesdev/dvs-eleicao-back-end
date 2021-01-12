const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require("mongoose-paginate");

const InscricoesSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  cpf: {
    type: String, required: true,
    unique: true,
    required: [true, "não pode ficar vazio."],
    index: true,
  },
  dataDeNascimento: {
    type: Date, required: true
  },
  sexo: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "não pode ficar vazio."],
    index: true,
    match: [/\S+@\S+\.\S+/, 'é inválido.']
  },
  formacao: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  curso: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  ocupacao: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
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
  celular: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  recado: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  experiencia: {
    type: String
  },
  desc__experiencia: {
    type: String
  },
  areas__atuacao: {
    type: [{ type: String }]
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  foto: {
    type: Array, default: []
  },
  doc__frente: {
    type: Array, default: []
  },
  doc__verso: {
    type: Array, default: []
  },
  password: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  deletado: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'Pendente'
  },
}, { timestamps: true });

InscricoesSchema.plugin(mongoosePaginate);
InscricoesSchema.plugin(uniqueValidator, { message: "já está sendo utilizado" });

module.exports = mongoose.model("Inscricoes", InscricoesSchema);
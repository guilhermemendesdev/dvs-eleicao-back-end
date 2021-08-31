const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require("mongoose-paginate");

const CandidatoSchema = new mongoose.Schema({
  cpf: {
    type: String,
    unique: true,
    required: [true, "não pode ficar vazio."]
  },
  nome: {
    type: String,
    required: [true, "não pode ficar vazio."],
  },
  telefone: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  dt_nascimento: {
    type: Date,
    required: [true, "não pode ficar vazio"]
  },
  rg: {
    type: String,
    required: [true, "não pode ficar vazio."],
  },
  cargo: {
    type: String,
    required: [true, "não pode ficar vazio."],
  },
  funcao: {
    type: String,
    required: [true, "não pode ficar vazio."],
  },
  graduacao: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
  },
  curso_graduacao: {
    type: String
  },
  pos_graduacao: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
    default: false
  },
  curso_pos_graduacao: {
    type: String
  },
  mestrado: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
    default: false
  },
  curso_mestrado: {
    type: String
  },
  doutorado: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
    default: false
  },
  curso_doutorado: {
    type: String
  },
  curso_gestor: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
    default: false
  },
  obs_curso_gestor: {
    type: String
  },
  outros_cursos: {
    type: Boolean,
    default: false
  },
  data_entrada_inst: {
    type: Date,
    required: [true, "não pode ficar vazio."]
  },
  data_entrada_docencia: {
    type: Date,
    required: [true, "não pode ficar vazio."]
  },
  tempo_modulacao: {
    type: String
  },
  tempo_docencia: {
    type: String
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "não pode ficar vazio."],
    match: [/\S+@\S+\.\S+/, 'é inválido.']
  },
  endereco: {
    type: {
      cep: { type: String, required: true },
      rua: { type: String, required: true },
      complemento: { type: String },
      cidade: { type: String, required: true },
      uf: { type: String, required: true },
      bairro: { type: String, required: true },
      numero: { type: String }
    },
    required: true
  },
  foto: {
    type: Array,
    default: []
  },
  protocolo: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  zona: {
    type: Schema.Types.ObjectId,
    ref: 'Zona'
  },
  deletado: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
    default: false
  },
}, { timestamps: true }, { collection: 'candidato' });

CandidatoSchema.plugin(mongoosePaginate);
CandidatoSchema.plugin(uniqueValidator, { message: "já está sendo utilizado" });

module.exports = mongoose.model("Candidato", CandidatoSchema);
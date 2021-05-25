const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require("mongoose-paginate");

const AlunoSchema = new mongoose.Schema({
  idescola: {
    type: Schema.Types.ObjectId,
    ref: 'Zona'
  },
  inep: {
    type: String,
    required: [true, "não pode ficar vazio."],
  },
  nome: {
    type: String,
    required: [true, "não pode ficar vazio."],
  },
  dataNascimento: {
    type: Date,
    required: [true, "não pode ficar vazio"]
  },
  serie: {
    type: String,
    required: [true, "não pode ficar vazio."],
  },
  turma: {
    type: String,
    required: [true, "não pode ficar vazio."],
  },
  mae: {
    type: String,
    required: [true, "não pode ficar vazio."],
  },
  pai: {
    type: String
  },
  responsavel: {
    type: String,
    required: [true, "não pode ficar vazio."],
  },
  cpf_filiacao1: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
  },
  cpf_filiacao2: {
    type: String
  },
  cpf_responsavel: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
  },
  status_matricula: {
    type: String
  },
  deletado: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
    default: false
  },
}, { timestamps: true }, { collection: 'aluno' });

AlunoSchema.plugin(mongoosePaginate);
AlunoSchema.plugin(uniqueValidator, { message: "já está sendo utilizado" });

module.exports = mongoose.model("Aluno", AlunoSchema);
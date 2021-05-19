const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require("mongoose-paginate");

const VotoSchema = new mongoose.Schema({
  data_hora_voto: {
    type: Date,
    required: [true, "não pode ficar vazio."]
  },
  candidato: {
    type: Schema.Types.ObjectId,
    ref: "Candidato",
    required: true
  },
  cpf_votante: {
    type: String,
    required: [true, "não pode ficar vazio."],
    default: false
  },
  votacao: {
    type: Schema.Types.ObjectId,
    ref: "Votacao",
    required: true
  },
  deletado: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
    default: false
  },
}, { timestamps: true }, { collection: 'voto' });

VotoSchema.plugin(mongoosePaginate);
VotoSchema.plugin(uniqueValidator, { message: "já está sendo utilizado" });

module.exports = mongoose.model("Voto", VotoSchema);
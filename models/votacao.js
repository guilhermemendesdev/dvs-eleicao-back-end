const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require("mongoose-paginate");

const VotacaoSchema = new mongoose.Schema({
  zona: {
    type: Schema.Types.ObjectId,
    ref: "Zona",
    required: true
  },
  voto: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Voto"
    }]
  },
  confirmado: {
    type: Boolean,
    default: false
  },
  resultado: {
    type: {
      candidato: {
        type: Schema.Types.ObjectId,
        ref: "Candidato",
        required: true
      },
      porcentagem: { type: Number, required: true }
    },
    required: false,
    default: {},
  },
  status: { type: String },
  deletado: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
    default: false
  },
}, { timestamps: true }, { collection: 'votacao' });

VotacaoSchema.plugin(mongoosePaginate);
VotacaoSchema.plugin(uniqueValidator, { message: "já está sendo utilizado" });

module.exports = mongoose.model("Votacao", VotacaoSchema);
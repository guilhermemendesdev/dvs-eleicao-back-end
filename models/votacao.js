const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require("mongoose-paginate");

const VotacaoSchema = new mongoose.Schema({
  zona: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  chapa: {
    type: Schema.Types.ObjectId,
    ref: "Chapa",
    required: true
  },
  votante: {
    type: Schema.Types.ObjectId,
    ref: "Votante",
    required: true
  },
  deletado: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
    default: false
  },
}, { timestamps: true }, { collection: 'votacao' });

VotacaoSchema.plugin(mongoosePaginate);
VotacaoSchema.plugin(uniqueValidator, { message: "já está sendo utilizado" });

module.exports = mongoose.model("Votacao", VotacaoSchema);
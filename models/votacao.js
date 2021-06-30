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
  iniciada: {
    type: String
  },
  finalizada: {
    type: String
  },
  voto: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Voto"
    }]
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
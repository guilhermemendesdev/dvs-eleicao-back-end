const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require("mongoose-paginate");

const ChapaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  zona: {
    type: Schema.Types.ObjectId,
    ref: "Zona",
    required: true
  },
  numero: {
    type: Number,
    required: [true, "não pode ficar vazio."]
  },
  candidato: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Candidato"
    }]
  },
  deletado: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
    default: false
  },
}, { timestamps: true }, { collection: 'chapa' });

ChapaSchema.plugin(mongoosePaginate);
ChapaSchema.plugin(uniqueValidator, { message: "já está sendo utilizado" });

module.exports = mongoose.model("Chapa", ChapaSchema);
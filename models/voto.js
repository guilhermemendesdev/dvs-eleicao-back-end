const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require("mongoose-paginate");

const VotoSchema = new mongoose.Schema({
  data_hora_voto: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  candidato: {
    type: Schema.Types.ObjectId,
    ref: "Candidato",
    required: true
  },
  tipo_voto: {
    type: String,
    required: true
  },
  zona: {
    type: Schema.Types.ObjectId,
    ref: "Zona",
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
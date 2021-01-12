const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CursosSchema = Schema({
  nome: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Cursos", CursosSchema);
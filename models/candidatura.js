const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const CandidaturaSchema = Schema({
  voluntario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  portifolio: { type: Schema.Types.ObjectId, ref: 'Portifolio', required: true },
  cancelado: { type: Boolean, default: false },
}, { timestamps: true });

CandidaturaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Candidatura', CandidaturaSchema);
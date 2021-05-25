const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require("mongoose-paginate");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const ZonaSchema = new mongoose.Schema({
  inep: {
    type: Number,
    required: [true, "não pode ficar vazio."]
  },
  nome: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  diretor: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  coordenador_geral: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  telefone: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'não pode ficar vazio.'],
    index: true,
    //  match: [/\S+@\S+\.\S+\, 'é inválido.']
  },
  endereco: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  status: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  tipo: {
    type: String,
    required: [true, "não pode ficar vazio."]
  },
  zona: {
    type: String
  },
  permissao: {
    type: Array,
    default: ['adm']
  },
  hash: String,
  salt: String,
  deletado: Boolean,
  recovery: {
    type: {
      token: String,
      date: Date
    },
    default: {}
  },
  deletado: {
    type: Boolean,
    required: [true, "não pode ficar vazio."],
    default: false
  },
}, { timestamps: true }, { collection: 'zona' });

ZonaSchema.plugin(mongoosePaginate);
ZonaSchema.plugin(uniqueValidator, { message: 'Já está sendo utilizado' });

ZonaSchema.methods.setSenha = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

ZonaSchema.methods.validarSenha = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return hash === this.hash;
};

ZonaSchema.methods.gerarToken = function () {
  const hoje = new Date();
  const exp = new Date(hoje);
  exp.setDate(hoje.getDate() + 15);

  return jwt.sign({
    id: this._id,
    email: this.email,
    nome: this.nome,
    exp: parseFloat(exp.getTime() / 1000, 10)
  }, secret);
};

ZonaSchema.methods.enviarAuthJSON = function () {
  return {
    _id: this._id,
    nome: this.nome,
    email: this.email,
    role: this.permissao,
    token: this.gerarToken()
  };
};

//RECUPERAÇÃO
ZonaSchema.methods.criarTokenRecuperacaoSenha = function () {
  this.recovery = {};
  this.recovery.token = crypto.randomBytes(16).toString('hex');
  this.recovery.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  return this.recovery
};

ZonaSchema.methods.finalizarTokenRecuperacaoSenha = function () {
  this.recovery = { token: null, date: null };
  return this.recovery;
};

module.exports = mongoose.model("Zona", ZonaSchema);
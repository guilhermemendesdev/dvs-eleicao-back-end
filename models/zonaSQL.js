const Sequelize = require('sequelize')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const sequelize = new Sequelize(nameDB, dadosDb.login, dadosDb.password, {
  host: hostDB,
  dialect: 'postgres'
})

const Zona = sequelize.define('zona',{
  inep: {
    type: Sequelize.STRING,
    required: [true, 'Não pode ficar vazio.']
  },
  idescola: {
    type: Sequelize.STRING,
  },
  nome: {
    type: Sequelize.STRING,
    required: [true, 'Não pode ficar vazio.']
  },
  diretor: {
    type: Sequelize.STRING,
    required: [true, 'Não pode ficar vazio.']
  },
  coordenador_geral: {
    type: Sequelize.STRING,
    required: [true, 'Não pode ficar vazio.']
  },
  telefone: {
    type: Sequelize.STRING,
    required: [true, 'Não pode ficar vazio.']
  },
  email: {
    type: Sequelize.STRING,
    lowercase: true,
    unique: true,
    index: true,
    //  match: [/\S+@\S+\.\S+\, 'é inválido.']
  },
  endereco: {
    type: Sequelize.STRING,

  },
  status: {
    type: Sequelize.STRING,

  },
  tipo: {
    type: Sequelize.STRING,

  },
  zona: {
    type: String
  },
  role: {
    type: Sequelize.STRING,
    required: [true, 'Não pode ficar vazio.'],
    defaultValue: "super-adm"
  },
  acesso: {
    type: Sequelize.NUMBER,
    default: 0
  },
  hash: {
    type: Sequelize.TEXT,
  },
  salt: {
    type: Sequelize.STRING,
  },
  deletado: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  recovery: {
    type: {
      token: Sequelize.STRING,
      date: Sequelize.DATE
    },
    default: {}
  },
  deletado: {
    type: Sequelize.BOOLEAN,
    default: false
  }
});

Zona.methods.setSenha = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

Zona.methods.validarSenha = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return hash === this.hash;
};

Zona.methods.gerarToken = function () {
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

Zona.methods.enviarAuthJSON = function () {
  return {
    _id: this._id,
    nome: this.nome,
    email: this.email,
    role: this.role,
    acesso: this.acesso,
    token: this.gerarToken()
  };
};

//RECUPERAÇÃO
Zona.methods.criarTokenRecuperacaoSenha = function () {
  this.recovery = {};
  this.recovery.token = crypto.randomBytes(16).toString('hex');
  this.recovery.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  return this.recovery
};

Zona.methods.finalizarTokenRecuperacaoSenha = function () {
  this.recovery = { token: null, date: null };
  return this.recovery;
};

module.exports = Zona
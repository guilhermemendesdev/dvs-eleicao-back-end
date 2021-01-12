const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;
const mongoosePaginate = require("mongoose-paginate");

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "não pode ficar vazio."]
    },
    cpf: {
        type: String, required: true,
        unique: true,
        required: [true, "não pode ficar vazio."],
        index: true,
    },
    permissao: {
        type: Array,
        default: ["candidato"]
    },
    foto: {
        type: Array, default: []
    },
    hash: { type: String },
    salt: { type: String },
    recovery: {
        type: {
            token: String,
            date: Date
        },
        default: {}
    },
    deletado: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

UsuarioSchema.plugin(uniqueValidator, { message: "já está sendo utilizado" });

UsuarioSchema.methods.setSenha = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

UsuarioSchema.methods.validarSenha = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
    return hash === this.hash;
};

UsuarioSchema.methods.gerarToken = function () {
    const hoje = new Date();
    const exp = new Date(hoje);
    exp.setDate(hoje.getDate() + 15);

    return jwt.sign({
        id: this._id,
        cpf: this.cpf,
        nome: this.nome,
        exp: parseFloat(exp.getTime() / 1000, 10)
    }, secret);
};

UsuarioSchema.methods.enviarAuthJSON = function () {
    return {
        _id: this._id,
        nome: this.nome,
        cpf: this.cpf,
        role: this.permissao,
        token: this.gerarToken()
    };
};

// RECUPERACAO
UsuarioSchema.methods.criarTokenRecuperacaoSenha = function () {
    this.recovery = {};
    this.recovery.token = crypto.randomBytes(16).toString("hex");
    this.recovery.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    return this.recovery;
};

UsuarioSchema.plugin(mongoosePaginate);
UsuarioSchema.methods.finalizarTokenRecuperacaoSenha = function () {
    this.recovery = { token: null, date: null };
    return this.recovery;
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
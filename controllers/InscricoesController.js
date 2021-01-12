const mongoose = require('mongoose');
const Inscricoes = mongoose.model('Inscricoes');
const Usuario = mongoose.model('Usuario');
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

class InscricoesController {

  /**
    *
    * ADM
    *
    */

  //GET / index
  async index(req, res, next) {
    try {
      const inscricoes = await Inscricoes.paginate();
      return res.send({ inscricoes });
    } catch (e) {
      next(e);
    }
  }

  //GET /:search
  async search(req, res, next) {
    const search = new RegExp(req.params.search, 'i');
    try {
      const inscricoes = await Inscricoes.paginate(
        { cpf: { $regex: search } },
      );
      return res.send({ inscricoes });
    } catch (e) {
      next(e);
    }
  }

  //GET /:id
  async showAdm(req, res, next) {
    try {
      const inscricoes = await Inscricoes.findOne({ _id: req.params.id }).populate({ path: 'inscricoes', select: '-salt -hash' });
      return res.send({ inscricoes });
    } catch (e) {
      next(e);
    }
  }

  //DELETE /:id
  async removeAdm(req, res, next) {
    try {
      const inscricoes = await Inscricoes.findById(req.params.id).populate("usuario");
      if (!inscricoes) return res.status(400).send({ error: "Inscrição não encontrada." })
      inscricoes.usuario.deletado = true;
      await inscricoes.usuario.save();
      inscricoes.deletado = true;
      await inscricoes.save();
      return res.send({ deletado: true });
    } catch (e) {
      next(e);
    }
  }

  //PUT /adm/:id
  async updateAdm(req, res, next) {
    const {
      dataDeNascimento,
      sexo,
      email,
      formacao,
      curso,
      ocupacao,
      endereco,
      celular,
      recado,
      experiencia,
      desc__experiencia,
      areas__atuacao
    } = req.body;
    try {
      const inscricoes = await Inscricoes.findById(req.params.id);
      if (!inscricoes) return res.send({ error: 'Inscrição não existe.' })
      if (dataDeNascimento) inscricoes.dataDeNascimento = dataDeNascimento;
      if (sexo) inscricoes.sexo = sexo;
      if (endereco) inscricoes.endereco = endereco;
      if (email) inscricoes.email = email;

      if (formacao) inscricoes.formacao = formacao;
      if (curso) inscricoes.curso = curso;
      if (ocupacao) inscricoes.ocupacao = ocupacao;
      if (celular) inscricoes.celular = celular;
      if (recado) inscricoes.recado = recado;
      if (experiencia) inscricoes.experiencia = experiencia;
      if (desc__experiencia) inscricoes.desc__experiencia = desc__experiencia;
      if (areas__atuacao) inscricoes.areas__atuacao = areas__atuacao;

      await inscricoes.save();
      return res.send({ inscricoes });
    } catch (e) {
      next(e)
    }
  }

  /*
 * CLIENTE
 * 
 */

  async show(req, res, next) {
    try {
      const inscricoes = await Inscricoes.findOne({ usuario: req.payload.id }).populate({ path: 'inscricoes', select: '-salt -hash' });
      return res.send({ inscricoes });
    } catch (e) {
      next(e);
    }
  }

  async store(req, res, next) {
    const {
      nome,
      cpf,
      dataDeNascimento,
      sexo,
      email,
      formacao,
      curso,
      ocupacao,
      endereco,
      celular,
      recado,
      experiencia,
      desc__experiencia,
      areas__atuacao,
      password
    } = req.body;

    const usuario = new Usuario({ nome, email, password, cpf });
    usuario.setSenha(password);
    const inscricoes = new Inscricoes({
      nome,
      cpf,
      dataDeNascimento,
      sexo,
      email,
      formacao,
      curso,
      ocupacao,
      endereco,
      celular,
      recado,
      experiencia,
      desc__experiencia,
      areas__atuacao,
      password,
      usuario: usuario._id
    })
    try {
      await usuario.save();
      await inscricoes.save();

      return res.send({ inscricoes: Object.assign({}, inscricoes._doc, { cpf: usuario.cpf }) });
    } catch (e) {
      next(e)
    }
  }

  async update(req, res, next) {
    const {
      nome,
      cpf,
      dataDeNascimento,
      sexo,
      email,
      formacao,
      curso,
      ocupacao,
      endereco,
      celular,
      recado,
      experiencia,
      desc__experiencia,
      areas__atuacao,
      password
    } = req.body;
    try {
      const inscricoes = await Inscricoes.findOne({ usuario: req.payload.id }).populate({ path: 'usuario', select: '-salt -hash' });
      if (!inscricoes) return res.send({ error: 'Inscrição não existe.' })
      if (nome) {
        inscricoes.usuario.nome = nome;
        inscricoes.nome = nome;
      }
      if (cpf) inscricoes.usuario.cpf = cpf;
      if (password) inscricoes.usuario.setSenha(password);
      if (dataDeNascimento) inscricoes.dataDeNascimento = dataDeNascimento;
      if (sexo) inscricoes.sexo = sexo;
      if (endereco) inscricoes.endereco = endereco;
      if (email) inscricoes.email = email;

      if (formacao) inscricoes.formacao = formacao;
      if (curso) inscricoes.curso = curso;
      if (ocupacao) inscricoes.ocupacao = ocupacao;
      if (celular) inscricoes.celular = celular;
      if (recado) inscricoes.recado = recado;
      if (experiencia) inscricoes.experiencia = experiencia;
      if (desc__experiencia) inscricoes.desc__experiencia = desc__experiencia;
      if (areas__atuacao) inscricoes.areas__atuacao = areas__atuacao;

      await inscricoes.save();
      inscricoes.usuario = {
        email: inscricoes.usuario.email,
        _id: inscricoes.usuario._id,
      }
      return res.send({ inscricoes });
    } catch (e) {
      next(e)
    }
  }

  //PUT /images/:id
  async updateFoto(req, res, next) {
    try {
      const inscricoes = await Inscricoes.findOne({ _id: req.params.id });
      const usuario = await Usuario.findOne({ _id: inscricoes.usuario });
      if (!inscricoes) return res.status(400).send({ error: "Inscrição não encontrada." });

      const image = inscricoes.foto[0];
      if (image) promisify(fs.unlink)(path.resolve(__dirname, '..', 'public', 'doc__inscricao', image))

      const novasImagens = req.files.map(item => item.filename);
      inscricoes.foto = novasImagens
      usuario.foto = novasImagens

      await inscricoes.save();
      await usuario.save();

      return res.send({ inscricoes });
    } catch (e) {
      next(e);
    }
  }
  async updateFrente(req, res, next) {
    try {
      const inscricoes = await Inscricoes.findOne({ _id: req.params.id });
      if (!inscricoes) return res.status(400).send({ error: "Inscrição não encontrada." });

      const image = inscricoes.doc__frente[0];
      if (image) promisify(fs.unlink)(path.resolve(__dirname, '..', 'public', 'doc__inscricao', image))

      const novasImagens = req.files.map(item => item.filename);
      inscricoes.doc__frente = novasImagens

      await inscricoes.save();

      return res.send({ inscricoes });
    } catch (e) {
      next(e);
    }
  }
  async updateVerso(req, res, next) {
    try {
      const inscricoes = await Inscricoes.findOne({ _id: req.params.id });
      if (!inscricoes) return res.status(400).send({ error: "Inscrição não encontrada." });

      const image = inscricoes.doc__verso[0];
      if (image) promisify(fs.unlink)(path.resolve(__dirname, '..', 'public', 'doc__inscricao', image))

      const novasImagens = req.files.map(item => item.filename);
      inscricoes.doc__verso = novasImagens

      await inscricoes.save();

      return res.send({ inscricoes });
    } catch (e) {
      next(e);
    }
  }
  async remove(req, res, next) {
    try {
      const inscricoes = await Inscricoes.findOne({ usuario: req.payload.id }).populate({ path: 'usuario', select: '-salt -hash' });
      inscricoes.usuario.deletado = true;
      await inscricoes.usuario.save();
      inscricoes.deletado = true;
      await inscricoes.save();
      return res.send({ deletado: true })
    } catch (e) {
      next(e);
    }
  }

}

module.exports = InscricoesController
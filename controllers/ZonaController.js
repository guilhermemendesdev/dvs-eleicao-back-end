const mongoose = require('mongoose');
const Zona = mongoose.model('Zona');
const Usuario = mongoose.model('Usuario');
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const EmailController = require('./EmailController');

class ZonaController {

  /**
    *
    * ADM
    *
    */


  //GET /:id
  async showAll(req, res, next) {
    try {
      const zona = await Zona.find({ deletado: false }, '_id nome');
      return res.send({ zona });
    } catch (e) {
      next(e);
    }
  }

  //GET
  async showAdm(req, res, next) {
    try {
      const zona = await Zona.findOne({ _id: req.params.id });
      return res.send({ zona });
    } catch (e) {
      next(e);
    }
  }

  //DELETE /:id
  async remove(req, res, next) {
    try {
      const zona = await Zona.findById(req.params.id);
      if (!zona) return res.status(400).send({ error: "Zona não encontrada." })
      zona.deletado = true;
      await zona.save();
      return res.send({ deletado: true });
    } catch (e) {
      next(e);
    }
  }

  // POST /
  store(req, res, next) {
    const {
      nome,
      coordenador_geral,
      coordenador_pedagogico,
      diretor
    } = req.body;
    const zona = new Zona({
      nome,
      coordenador_geral,
      coordenador_pedagogico,
      diretor
    });
    zona.save().then(() => res.send({ zona })).catch(next);
  }

  async update(req, res, next) {
    const {
      password } = req.body;
    try {
      const zona = await Zona.findById(req.payload.id)
      if (password) zona.setSenha(password)
      zona.acesso = 1
      await zona.save();
      return res.send({ zona });
    } catch (e) {
      next(e)
    }
  }

}

module.exports = ZonaController
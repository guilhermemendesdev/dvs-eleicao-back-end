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
      const zona = await Zona.find({ deletado: false });
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

  //PUT /images/:id
  // async updateFoto(req, res, next) {
  //   try {
  //     const candidato = await Candidato.findOne({ _id: req.params.id });
  //     if (!candidato) return res.status(400).send({ error: "Candidato não encontrado." });

  //     const novasImagens = req.files.map(item => item.filename);
  //     candidato.foto = candidato.foto.filter(item => item).concat(novasImagens);

  //     await candidato.save();

  //     return res.send({ candidato });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  async update(req, res, next) {
    const {
      nome,
      coordenador_geral,
      coordenador_pedagogico,
      diretor } = req.body;
    try {
      const zona = await Zona.findById(req.params.id)
      if (nome) zona.nome = nome;
      if (coordenador_geral) zona.coordenador_geral = coordenador_geral;
      if (coordenador_pedagogico) zona.coordenador_pedagogico = coordenador_pedagogico;
      if (diretor) zona.diretor = diretor;
      await zona.save();
      return res.send({ zona });
    } catch (e) {
      next(e)
    }
  }

}

module.exports = ZonaController
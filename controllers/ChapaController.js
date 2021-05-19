const mongoose = require('mongoose');
const Chapa = mongoose.model('Chapa');
const Usuario = mongoose.model('Usuario');
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const EmailController = require('./EmailController');

class ChapaController {

  /**
    *
    * ADM
    *
    */


  //GET /:id
  async index(req, res, next) {
    const { zona } = req.query
    try {
      const chapa = await Chapa.find({ zona: zona, deletado: false });
      return res.send({ chapa });
    } catch (e) {
      next(e);
    }
  }

  //GET
  async show(req, res, next) {
    const { zona } = req.query
    try {
      const chapa = await Chapa.findOne({ _id: req.params.id, zona: zona, deletado: false });
      return res.send({ chapa });
    } catch (e) {
      next(e);
    }
  }

  //DELETE /:id
  async remove(req, res, next) {
    try {
      const chapa = await Chapa.findById(req.params.id);
      if (!chapa) return res.status(400).send({ error: "Chapa não encontrado." })
      chapa.deletado = true;
      await chapa.save();
      return res.send({ deletado: true });
    } catch (e) {
      next(e);
    }
  }


  async store(req, res, next) {
    const dadosChapa = req.body
    const { zona } = req.query
    const chapa = new Chapa({
      nome: dadosChapa.nome,
      zona: zona
    })
    try {
      await chapa.save();
      return res.send({ chapa });
    } catch (e) {
      next(e)
    }
  }

  async update(req, res, next) {
    const { nome } = req.body;
    const { zona } = req.query
    try {
      const chapa = await Chapa.findById({ _id: req.params.id, zona: zona })
      if (nome) chapa.nome = nome;
      await chapa.save();
      return res.send({ chapa });
    } catch (e) {
      next(e)
    }
  }

}

module.exports = ChapaController
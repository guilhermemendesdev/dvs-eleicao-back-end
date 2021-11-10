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
      inep,
      password
    } = req.body;
    const zona = new Zona({
      nome,
      password,
      inep
    });
    zona.setSenha(password)
    zona.save().then(() => res.json({ zona: zona.enviarAuthJSON() }))

  }

  async update(req, res, next) {
    const {
      password } = req.body;
    try {
      console.log(req.payload.id)
      const zona = await Zona.findById(req.payload.id)
      console.log(zona.setSenha(password))
      if (password) zona.setSenha(password)
      console.log('teste')
      zona.acesso = 1
      await zona.save();
      return res.send({ zona });
    } catch (e) {
      next(e)
    }
  }

  /*RESETAR SENHA DE UM INEP*/
  // async update(req, res, next) {
  //   const { password } = req.body;
  //   try {
  //     const zona = await Zona.findOne({ inep: "52128202" }).then(item => {
  //       item.setSenha('123456')
  //       item.acesso = 0
  //       item.save()
  //     })
  //     return res.send({ zona });
  //   } catch (e) {
  //     next(e)
  //   }
  // }

}

module.exports = ZonaController
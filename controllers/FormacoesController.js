const mongoose = require('mongoose');
const Formacoes = mongoose.model('Formacoes');

class FormacoesController {

  //GET /
  async index(req, res, next) {
    try {
      const formacoes = await Formacoes.find()
      return res.send({ formacoes });
    } catch (e) {
      next(e)
    }
  }

  //POST /
  async store(req, res, next) {
    const { nome } = req.body;

    const formacoes = await Formacoes({ nome });
    formacoes.save()
      .then(() => res.send({ formacoes }))
      .catch(next);
  }

  //PUT /:id
  async update(req, res, next) {
    const { nome } = req.body;
    try {
      const formacoes = await Formacoes.findById(req.params.id);

      if (nome) formacoes.nome = nome;

      await formacoes.save();
      return res.send({ formacoes });
    } catch (e) {
      next(e);
    }
  }

  //DELETE /:id
  async remove(req, res, next) {
    try {
      const formacoes = await Formacoes.findById(req.params.id);
      await formacoes.remove();
      return res.send({ deletado: true });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = FormacoesController;
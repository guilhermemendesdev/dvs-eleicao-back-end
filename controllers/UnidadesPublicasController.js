const mongoose = require('mongoose');
const UnidadesPublicas = mongoose.model('UnidadesPublicas');

class UnidadesPublicasController {

  //GET /
  async index(req, res, next) {
    try {
      const unidadesPublicas = await UnidadesPublicas.find()
      return res.send({ unidadesPublicas });
    } catch (e) {
      next(e)
    }
  }

  async show(req, res, next) {
    try {
      const unidadesPublicas = await UnidadesPublicas.findOne({ _id: req.params.id });
      return res.send({ unidadesPublicas });
    } catch (e) {
      next(e);
    }
  }

  //POST /
  async store(req, res, next) {
    const {
      descricao,
      status,
      nome__responsavel,
      email__responsavel,
      telefone__responsavel,
      email__unidade,
      endereco } = req.body;

    const unidadesPublicas = await UnidadesPublicas({
      descricao,
      status,
      nome__responsavel,
      email__responsavel,
      telefone__responsavel,
      email__unidade,
      endereco
    });
    unidadesPublicas.save()
      .then(() => res.send({ unidadesPublicas }))
      .catch(next);
  }

  //PUT /:id
  async update(req, res, next) {
    const { descricao,
      status,
      nome__responsavel,
      email__responsavel,
      telefone__responsavel,
      email__unidade,
      endereco } = req.body;
    try {
      const unidadesPublicas = await UnidadesPublicas.findById(req.params.id);

      if (descricao) unidadesPublicas.descricao = descricao;
      if (status) unidadesPublicas.status = status;
      if (nome__responsavel) unidadesPublicas.nome__responsavel = nome__responsavel;
      if (email__responsavel) unidadesPublicas.email__responsavel = email__responsavel;
      if (telefone__responsavel) unidadesPublicas.telefone__responsavel = telefone__responsavel;
      if (email__unidade) unidadesPublicas.email__unidade = email__unidade;
      if (endereco) unidadesPublicas.endereco = endereco;

      await unidadesPublicas.save();
      return res.send({ unidadesPublicas });
    } catch (e) {
      next(e);
    }
  }

  //DELETE /:id
  async remove(req, res, next) {
    try {
      const unidadesPublicas = await UnidadesPublicas.findById(req.params.id);
      unidadesPublicas.deletado = true;
      await unidadesPublicas.save();
      return res.send({ deletado: true });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UnidadesPublicasController;
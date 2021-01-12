const mongoose = require('mongoose');
const Cursos = mongoose.model('Cursos');

class CursosController {

  //GET /
  async index(req, res, next) {
    try {
      const cursos = await Cursos.find()
      return res.send({ cursos });
    } catch (e) {
      next(e)
    }
  }

  //POST /
  async store(req, res, next) {
    const { nome } = req.body;

    const cursos = await Cursos({ nome });
    cursos.save()
      .then(() => res.send({ cursos }))
      .catch(next);
  }

  //PUT /:id
  async update(req, res, next) {
    const { nome } = req.body;
    try {
      const cursos = await Cursos.findById(req.params.id);

      if (nome) cursos.nome = nome;

      await cursos.save();
      return res.send({ cursos });
    } catch (e) {
      next(e);
    }
  }

  //DELETE /:id
  async remove(req, res, next) {
    try {
      const cursos = await Cursos.findById(req.params.id);
      await cursos.remove();
      return res.send({ deletado: true });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CursosController;
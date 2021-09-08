const mongoose = require('mongoose');

const Usuario = mongoose.model('Usuario');
const Funcionario = mongoose.model('Funcionario');
const Zona = mongoose.model('Zona');

class FuncionarioController {

  //ADM
  // get /admin
  async indexAdm(req, res, next) {
    const zona = req.payload.id;
    try {
      const funcionarios = await Funcionario.find(
        { idescola: zona }

      );
      return res.send({ funcionarios });
    } catch (e) {
      next(e);
    }
  }

  // // get /adm/:id
  async showAdm(req, res, next) {
    try {
      const funcionario = await Funcionario
        .findOne({ idescola: req.payload.id, _id: req.params.id })
      return res.send({ funcionario })
    } catch (e) {
      next(e)
    }
  }

  //GET /search/:search/pedidos
  async searchAlunos(req, res, next) {
    const { offset, limit } = req.query;
    const zona = req.payload.id;
    try {
      const search = new RegExp(req.params.search, 'i');
      const funcionarios = await Funcionario.paginate(
        {
          idescola: zona,
          nome: { $regex: search }
        }
      );

      // const funcionarios = await Funcionario.find({ idescola: zona, nome: { $regex: search } });
      return res.send({ funcionarios });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = FuncionarioController;

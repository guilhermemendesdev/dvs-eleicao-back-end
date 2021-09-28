const mongoose = require('mongoose');
const Aluno = mongoose.model('Aluno');
const Zona = mongoose.model('Zona');

class AlunoController {

  //ADM
  // get /admin
  async indexAdm(req, res, next) {
    const zona = req.payload.id
    try {
      const alunos = await Aluno.find(
        { idescola: zona }
      );
      return res.send({ alunos });
    } catch (e) {
      next(e);
    }
  }

  async showAll(req, res, next) {
    try {
      var lista = []
      await Zona.find({}, '_id inep').then(async response => {
        await Promise.all(response.map(async item => {
          const alunos = await Aluno.count({ inep: item.inep })
          lista.push({ unidade: item, qtd_alunos: alunos })
          return lista
        }))
      })
      return res.send({ lista })
    } catch (e) {
      next(e)
    }
  }

  // async showAll(req, res, next) {
  //   try {

  //     const zonas = await Zona.find()

  //     const aluno = await Aluno.find({ inep: 52021173 })
  //     aluno.map(item => {
  //       item.idescola = '614888c9d5360000e4009792'
  //       item.save()
  //     })
  //     return res.send({ aluno })
  //   } catch (e) {
  //     next(e)
  //   }
  // }


  // // get /adm/:id
  async showAdm(req, res, next) {
    try {
      const aluno = await Aluno
        .findOne({ idescola: req.payload.id, _id: req.params.id })
      return res.send({ aluno })
    } catch (e) {
      next(e)
    }
  }

  //GET /search/:search/pedidos
  async searchAlunos(req, res, next) {
    const { offset, limit } = req.query;
    const zona = req.payload.id
    try {
      const search = new RegExp(req.params.search, 'i');
      const alunos = await Aluno.paginate(
        {
          idescola: zona,
          nome: { $regex: search }
        }
      );
      return res.send({ alunos });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AlunoController;

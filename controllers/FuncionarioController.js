const mongoose = require('mongoose');

const Usuario = mongoose.model('Usuario');
const Funcionario = mongoose.model('Funcionario');
const Zona = mongoose.model('Zona');

class FuncionarioController {

  //ADM
  // get /admin
  async indexAdm(req, res, next) {
    try {
      const zonaInep = await Zona.findOne({ _id: req.payload.id })
      const funcionarios = await Funcionario.find({ inep: zonaInep.inep });
      return res.send({ funcionarios });
    } catch (e) {
      next(e);
    }
  }

  async showSuperAdm(req, res, next) {
    try {
      const zonaInep = await Zona.findOne({ _id: req.params.id })
      const funcionarios = await Funcionario.find({ inep: zonaInep.inep });
      return res.send({ funcionarios });
    } catch (e) {
      next(e);
    }
  }


  //GERAR NUMERO DE IDESCOLA

  // async indexAdm(req, res, next) {
  //   try {
  //     const funcionarios = await Funcionario.find({ inep: '52097145' })
  //     funcionarios.map(item => {
  //       item.idescola = '614888c9d5360000e4009767'
  //       item.save()
  //     })

  //     return res.send({ funcionarios })
  //   } catch (e) {
  //     next(e)
  //   }
  // }

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

  async showAll(req, res, next) {
    try {
      var lista = []
      await Zona.find({}, '_id inep').then(async response => {
        await Promise.all(response.map(async item => {
          const funcionarioTotais = await Funcionario.count({ inep: item.inep })
          const funcionarioVotantes = await Funcionario.count({ inep: item.inep })
          lista.push({ unidade: item, qtd_alunos_total: funcionarioTotais, qtd_alunos_votantes: funcionarioVotantes })
          return lista
        }))
      })
      return res.send({ lista })
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

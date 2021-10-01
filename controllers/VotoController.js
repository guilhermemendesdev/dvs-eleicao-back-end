const mongoose = require('mongoose');
const moment = require('moment')
const Voto = mongoose.model('Voto');
const Aluno = mongoose.model('Aluno');
const Funcionario = mongoose.model('Funcionario');
const Candidato = mongoose.model('Candidato');
const Votacao = mongoose.model('Votacao');
const { badRequest } = require('../helpers/http-helper')

class VotoController {

  async store(req, res, next) {
    const zona = req.payload.id;
    const { candidato, idVotante, tipoVoto } = req.body
    const votacao = await Votacao.findOne({ zona: zona })

    const hora = new Date
    const dataAtual = moment(hora).format('DD/MM/YYYY HH:mm:ss')

    if (!votacao) {
      const votacaoIniciada = new Votacao({
        zona: zona,
        iniciada: dataAtual,
      })
      votacaoIniciada.save()
      votacao = votacaoIniciada
    }

    try {
      if (tipoVoto === 'aluno' || tipoVoto === 'resp') {
        const aluno = await Aluno.findOne({ _id: idVotante })
        if (tipoVoto === 'aluno' && aluno.aluno_votou === true) throw badRequest('Aluno já votou!')
        if (tipoVoto === 'resp' && aluno.resp_votou === true) throw badRequest('Responsável já votou!')
        if (tipoVoto === 'aluno') aluno.aluno_votou = true
        if (tipoVoto === 'resp') aluno.resp_votou = true
        await aluno.save();
      }

      if (tipoVoto === 'func') {
        const funcionario = await Funcionario.findOne({ _id: idVotante })
        if (funcionario.votou === true) throw badRequest('Funcionário já votou!')
        funcionario.votou = true
        await funcionario.save();
      }

      const voto = new Voto({
        zona: zona,
        data_hora_voto: dataAtual,
        tipo_voto: tipoVoto,
        candidato: candidato,
        tipo_voto: tipoVoto
      })
      votacao.voto.push(voto._id)
      await voto.save();

      await votacao.save();
      return res.send({ voto })
    } catch (e) {
      next(e)
    }
  }


  //ADD ALEATORIAMENTE VOTOS

  // async store(req, res, next) {
  //   const zona = req.payload.id;
  //   const votacao = await Votacao.findOne({ zona: zona })

  //   const hora = new Date
  //   const dataAtual = moment(hora).format('DD/MM/YYYY HH:mm:ss')

  //   if (!votacao) {
  //     const votacaoIniciada = new Votacao({
  //       zona: zona,
  //       iniciada: dataAtual,
  //     })
  //     votacaoIniciada.save()
  //     votacao = votacaoIniciada
  //   }

  //   try {

  //     const candidato = await Candidato.find({ zona }, '_id')
  //     const idCandidato = candidato[Math.floor((Math.random() * candidato.length))]
  //     for (var i = 0; i < 100; i++) {
  //       const aluno = await Aluno.findOne({ inep: '52097145', resp_votou: false })
  //       const voto = new Voto({
  //         zona: zona,
  //         data_hora_voto: dataAtual,
  //         tipo_voto: 'resp',
  //         candidato: idCandidato._id
  //       })
  //       aluno.resp_votou = true
  //       await aluno.save();
  //       votacao.voto.push(voto._id)
  //       await voto.save();
  //       await votacao.save();
  //     }
  //     return res.send({ aluno })
  //   } catch (e) {
  //     next(e)
  //   }
  // }

  async showAll(req, res, next) {
    try {
      const votos = await Voto.find({}, '_id zona tipo_voto candidato')
      res.send({ votos })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = VotoController
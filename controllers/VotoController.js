const mongoose = require('mongoose');
const moment = require('moment')
const Voto = mongoose.model('Voto');
const Aluno = mongoose.model('Aluno');
const Votacao = mongoose.model('Votacao');

const EmailController = require('./EmailController');

class VotoController {

  async store(req, res, next) {
    const zona = req.payload.id;
    const { candidato, idAluno, votoResp } = req.body
    const votacao = await Votacao.findOne({ zona: zona })
    const hora = new Date
    const dataAtual = moment(hora).format('DD/MM/YYYY HH:mm:ss')
    const aluno = await Aluno.findOne({ _id: idAluno })
    if (votoResp === false) aluno.aluno_votou = true
    if (votoResp === true) aluno.resp_votou = true
    const voto = new Voto({
      zona: zona,
      data_hora_voto: dataAtual,
      candidato: candidato
    })
    votacao.voto.push(voto._id)
    try {
      await voto.save();
      await votacao.save();
      await aluno.save();
      return res.send({ voto });
    } catch (e) {
      next(e)
    }
  }
}

module.exports = VotoController
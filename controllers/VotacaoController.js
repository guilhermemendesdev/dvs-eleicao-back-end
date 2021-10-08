const mongoose = require('mongoose');
const moment = require('moment')
const Votacao = mongoose.model('Votacao');
const Usuario = mongoose.model('Usuario');
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const EmailController = require('./EmailController');

class CandidatoController {

  /**
    *
    * ADM
    *
    */


  //GET /:id
  async showAll(req, res, next) {
    const zona = req.payload.id
    try {
      const votacao = await Votacao.findOne({ zona: zona })
        .populate({
          path: 'voto',
          populate: { path: 'candidato' }
        });
      return res.send({ votacao });
    } catch (e) {
      next(e);
    }
  }

  async finalizarVotacao(req, res, next) {
    const votacao = await Votacao.findOne({ _id: req.params.id })
    const { candidato, porcentagem, status, confirmado } = req.body
    try {
      votacao.confirmado = confirmado
      votacao.resultado.candidato = candidato
      votacao.resultado.porcentagem = porcentagem
      votacao.status = status
      votacao.save()
      res.send({ votacao })
    } catch (e) {
      next(e)
    }
  }

  async showResultado(req, res, next) {
    try {
      const resultado = await Votacao.find({ confirmado: true }, 'resultado zona').populate({
        path: 'resultado.candidato',
        model: 'Candidato',
        select: 'nome foto cpf'
      }).populate({
        path: 'zona',
        model: 'Zona',
        select: 'nome'
      }
      )

      res.send({ resultado })
    } catch (e) {
      next(e)
    }
  }

  //GET
  // async showAdm(req, res, next) {
  //   try {
  //     const candidato = await Candidato.findOne({ _id: req.params.id });
  //     return res.send({ candidato });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  //DELETE /:id
  // async removeAdm(req, res, next) {
  //   try {
  //     const boletim = await Boletim.findById(req.params.id);
  //     if (!boletim) return res.status(400).send({ error: "Boletim não encontrado." })
  //     boletim.deletado = true;
  //     await boletim.save();
  //     return res.send({ deletado: true });
  //   } catch (e) {
  //     next(e);
  //   }
  // }


  async store(req, res, next) {
    const zona = req.payload.id;

    const hora = new Date
    const dataAtual = moment(hora).format('DD/MM/YYYY HH:mm:ss')
    const votacao = new Votacao({
      zona: zona,
      iniciada: dataAtual,
    })
    try {
      await votacao.save();
      return res.send({ votacao });
    } catch (e) {
      next(e)
    }
  }

  //PUT /images/:id
  // async updateFoto(req, res, next) {
  //   try {
  //     const candidato = await Candidato.findOne({ _id: req.params.id });
  //     if (!candidato) return res.status(400).send({ error: "Candidato não encontrado." });

  //     const novasImagens = req.files.map(item => item.filename);
  //     candidato.foto = candidato.foto.filter(item => item).concat(novasImagens);

  //     await candidato.save();

  //     return res.send({ candidato });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // async update(req, res, next) {
  //   const { nome, cpf, email, telefone, endereco, rg, dt_nascimento } = req.body;
  //   try {
  //     const candidato = await Candidato.findById(req.params.id)
  //     if (nome) candidato.nome = nome;
  //     if (email) candidato.email = email;
  //     if (cpf) candidato.cpf = cpf;
  //     if (telefone) candidato.telefone = telefone;
  //     if (endereco) candidato.endereco = endereco;
  //     if (rg) candidato.rg = rg;
  //     if (dt_nascimento) candidato.dt_nascimento = dt_nascimento;
  //     await candidato.save();
  //     return res.send({ candidato });
  //   } catch (e) {
  //     next(e)
  //   }
  // }

}

module.exports = CandidatoController
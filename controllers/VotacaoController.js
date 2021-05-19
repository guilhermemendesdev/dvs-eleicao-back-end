const mongoose = require('mongoose');
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
  // async showAll(req, res, next) {
  //   try {
  //     const candidato = await Candidato.find();
  //     return res.send({ candidato });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

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
    const dadosVotacao = req.body

    const votacao = new Votacao({
      zona_eleitoral: dadosVotacao.zona_eleitoral,
      candidatos: dadosVotacao.candidatos
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
const mongoose = require('mongoose');
const Candidato = mongoose.model('Candidato');
const Chapa = mongoose.model('Chapa');
const moment = require('moment')
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


  async search(req, res, next) {
    const { zona } = req.query;
    const search = new RegExp(req.params.search, 'i');
    try {
      const candidato = await Candidato.findOne(
        { numero_candidato: req.params.numero_candidato, zona: zona, deletado: false }
      );
      return res.send({ candidato });
    } catch (e) {
      next(e);
    }
  }

  //GET /:id
  async showAll(req, res, next) {
    const { offset, limit, zona } = req.query;
    try {
      const candidato = await Candidato.paginate(
        { zona: zona },
        {
          offset: Number(offset || 0),
          limit: Number(limit || 30),
        }
      );
      return res.send({ candidato });
    } catch (e) {
      next(e);
    }
  }

  //GET
  async showAdm(req, res, next) {
    const { zona } = req.query;
    try {
      const candidato = await Candidato.findOne({ _id: req.params.id, zona: zona }).populate([
        'chapa']);
      ;
      return res.send({ candidato });
    } catch (e) {
      next(e);
    }
  }

  //DELETE /:id
  async remove(req, res, next) {
    try {
      const candidato = await Candidato.findById(req.params.id);
      if (!candidato) return res.status(400).send({ error: "Candidato não encontrado." })
      candidato.deletado = true;
      await candidato.save();
      return res.send({ deletado: true });
    } catch (e) {
      next(e);
    }
  }


  async store(req, res, next) {
    const dadosCandidato = req.body;
    const { zona } = req.query;

    // REGRAS DE PROTOCOLO
    const numRandom = Math.floor((Math.random() * 65536) * Math.random() * 65536);

    // REGRAS DE TEMPOS DE INST E DOCENCIA
    function calculaTempo(data) {
      var dataAtual = new Date();
      var anoAtual = dataAtual.getFullYear();
      var anoDataParts = data.split('/');
      var diaData = anoDataParts[0];
      var mesData = anoDataParts[1];
      var anoData = anoDataParts[2];
      var idade = anoAtual - anoData;
      var mesAtual = dataAtual.getMonth() + 1;
      //Se mes atual for menor que a data informada, nao fez ano ainda;  
      if (mesAtual < mesData) {
        idade--;
      } else {
        //Se estiver no mes da data informada, verificar o dia
        if (mesAtual == mesData) {
          if (new Date().getDate() < diaData) {
            //Se a data atual for menor que a data informada ele ainda nao fez ano
            idade--;
          }
        }
      }
      return idade;
    }

    try {
      const candidato = new Candidato({
        cpf: dadosCandidato.cpf,
        nome: dadosCandidato.nome,
        email: dadosCandidato.email,
        telefone: dadosCandidato.telefone,
        dt_nascimento: dadosCandidato.dt_nascimento,
        rg: dadosCandidato.rg,
        endereco: dadosCandidato.endereco,
        cargo: dadosCandidato.cargo,
        funcao: dadosCandidato.funcao,
        graduacao: dadosCandidato.graduacao,
        curso_graduacao: dadosCandidato.curso_graduacao,
        pos_graduacao: dadosCandidato.pos_graduacao,
        curso_pos_graduacao: dadosCandidato.curso_pos_graduacao,
        mestrado: dadosCandidato.mestrado,
        curso_mestrado: dadosCandidato.curso_mestrado,
        doutorado: dadosCandidato.doutorado,
        curso_doutorado: dadosCandidato.curso_doutorado,
        curso_gestor: dadosCandidato.curso_gestor,
        obs_curso_gestor: dadosCandidato.obs_curso_gestor,
        outros_cursos: dadosCandidato.outros_cursos,
        data_entrada_inst: dadosCandidato.data_entrada_inst,
        data_entrada_docencia: dadosCandidato.data_entrada_docencia,
        tempo_modulacao: calculaTempo(moment(dadosCandidato.data_entrada_inst).format('DD/MM/YYYY')),
        tempo_docencia: calculaTempo(moment(dadosCandidato.data_entrada_docencia).format('DD/MM/YYYY')),
        numero_candidato: dadosCandidato.numero_candidato,
        protocolo: `EDU${numRandom}2021`,
        zona: zona,
        chapa: dadosCandidato.chapa
      })
      const chapa = await Chapa.findById(dadosCandidato.chapa);

      chapa.candidato.push(`${candidato._id}`);
      await candidato.save();
      await chapa.save();
      return res.send({ candidato });
    } catch (e) {
      next(e)
    }
  }

  //PUT /images/:id
  async updateFoto(req, res, next) {
    try {
      const candidato = await Candidato.findOne({ _id: req.params.id });
      if (!candidato) return res.status(400).send({ error: "Candidato não encontrado." });

      const novasImagens = req.files.map(item => item.filename);
      candidato.foto = candidato.foto.filter(item => item).concat(novasImagens);

      await candidato.save();

      return res.send({ candidato });
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    const {
      nome,
      cpf,
      email,
      telefone,
      endereco,
      rg,
      dt_nascimento,
      cargo,
      funcao,
      graduacao,
      curso_graduacao,
      pos_graduacao,
      curso_pos_graduacao,
      mestrado,
      curso_mestrado,
      doutorado,
      curso_doutorado,
      curso_gestor,
      obs_curso_gestor,
      outros_cursos,
      data_entrada_inst,
      data_entrada_docencia,
      numero_candidato,
      foto
    } = req.body;
    try {
      const candidato = await Candidato.findById(req.params.id)
      if (nome) candidato.nome = nome;
      if (email) candidato.email = email;
      if (cpf) candidato.cpf = cpf;
      if (telefone) candidato.telefone = telefone;
      if (endereco) candidato.endereco = endereco;
      if (rg) candidato.rg = rg;
      if (dt_nascimento) candidato.dt_nascimento = dt_nascimento;
      if (cargo) candidato.cargo = cargo;
      if (funcao) candidato.funcao = funcao;
      if (graduacao) candidato.graduacao = graduacao;
      if (curso_graduacao) candidato.curso_graduacao = curso_graduacao;
      if (pos_graduacao) candidato.pos_graduacao = pos_graduacao;
      if (curso_pos_graduacao) candidato.curso_pos_graduacao = curso_pos_graduacao;
      if (mestrado) candidato.mestrado = mestrado;
      if (curso_mestrado) candidato.curso_mestrado = curso_mestrado;
      if (doutorado) candidato.doutorado = doutorado;
      if (curso_doutorado) candidato.curso_doutorado = curso_doutorado;
      if (curso_gestor) candidato.curso_gestor = curso_gestor;
      if (obs_curso_gestor) candidato.obs_curso_gestor = obs_curso_gestor;
      if (outros_cursos) candidato.outros_cursos = outros_cursos;
      if (data_entrada_inst) candidato.data_entrada_inst = data_entrada_inst;
      if (data_entrada_docencia) candidato.data_entrada_docencia = data_entrada_docencia;
      if (numero_candidato) candidato.numero_candidato = numero_candidato;
      if (foto) candidato.foto = foto;
      console.log(res.req)
      await candidato.save();

      return res.send({ candidato });
    } catch (e) {
      next(e)
    }
  }

}

module.exports = CandidatoController
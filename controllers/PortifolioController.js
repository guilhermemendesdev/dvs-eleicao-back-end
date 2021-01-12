const mongoose = require('mongoose');
const Portifolio = mongoose.model('Portifolio');
const Usuario = mongoose.model('Usuario');
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

class PortifolioController {

  // NO AUTH
  //GET /:search
  async search(req, res, next) {
    // const offset = Number(req.query.offset) || 0;
    // const limit = Number(req.query.limit) || 30;
    const search = new RegExp(req.params.search, 'i');
    try {
      const portifolio = await Portifolio.paginate(

        { titulo: { $regex: search } },
      );
      return res.send({ portifolio });
    } catch (e) {
      next(e);
    }
  }

  /**
    *
    * ADM
    *
    */

  //GET / index
  async index(req, res, next) {
    try {
      const portifolio = await Portifolio.paginate(
        { deletado: false },
      );
      return res.send({ portifolio });
    } catch (e) {
      next(e);
    }
  }



  //GET /:id
  async showAdm(req, res, next) {
    try {
      const inscricoes = await Inscricoes.findOne({ _id: req.params.id }).populate({ path: 'inscricoes', select: '-salt -hash' });
      return res.send({ inscricoes });
    } catch (e) {
      next(e);
    }
  }

  //DELETE /:id
  async removeAdm(req, res, next) {
    try {
      const inscricoes = await Inscricoes.findById(req.params.id).populate("usuario");
      if (!inscricoes) return res.status(400).send({ error: "Inscrição não encontrada." })
      inscricoes.usuario.deletado = true;
      await inscricoes.usuario.save();
      inscricoes.deletado = true;
      await inscricoes.save();
      return res.send({ deletado: true });
    } catch (e) {
      next(e);
    }
  }

  //PUT /adm/:id
  async updateAdm(req, res, next) {
    const {
      dataDeNascimento,
      sexo,
      email,
      formacao,
      curso,
      ocupacao,
      endereco,
      celular,
      recado,
      experiencia,
      desc__experiencia,
      areas__atuacao
    } = req.body;
    try {
      const inscricoes = await Inscricoes.findById(req.params.id);
      if (!inscricoes) return res.send({ error: 'Inscrição não existe.' })
      if (dataDeNascimento) inscricoes.dataDeNascimento = dataDeNascimento;
      if (sexo) inscricoes.sexo = sexo;
      if (endereco) inscricoes.endereco = endereco;
      if (email) inscricoes.email = email;

      if (formacao) inscricoes.formacao = formacao;
      if (curso) inscricoes.curso = curso;
      if (ocupacao) inscricoes.ocupacao = ocupacao;
      if (celular) inscricoes.celular = celular;
      if (recado) inscricoes.recado = recado;
      if (experiencia) inscricoes.experiencia = experiencia;
      if (desc__experiencia) inscricoes.desc__experiencia = desc__experiencia;
      if (areas__atuacao) inscricoes.areas__atuacao = areas__atuacao;

      await inscricoes.save();
      return res.send({ inscricoes });
    } catch (e) {
      next(e)
    }
  }

  /*
 * CLIENTE
 * 
 */

  async show(req, res, next) {
    try {
      const portifolio = await Portifolio.findOne({ _id: req.params.id });
      return res.send({ portifolio });
    } catch (e) {
      next(e);
    }
  }

  async store(req, res, next) {
    const {
      tipo,
      titulo,
      resumo,
      telefone__responsavel,
      idade__minima,
      tipo__localizacao,
      responsavel,
      endereco,
      fotos,
      data__ini__cand,
      data__fim__cand,
      data__ini__duracao,
      data__fim__duracao,
      ponto__coleta,
      servico__voluntario,
      tipo__campanha,
      disp__horarios,
    } = req.body;

    const portifolio = new Portifolio({
      tipo,
      titulo,
      resumo,
      telefone__responsavel,
      idade__minima,
      tipo__localizacao,
      responsavel,
      endereco,
      fotos,
      data__ini__cand,
      data__fim__cand,
      data__ini__duracao,
      data__fim__duracao,
      ponto__coleta,
      servico__voluntario,
      tipo__campanha,
      disp__horarios,
    })
    try {
      await portifolio.save();

      return res.send({ portifolio: Object.assign({}, portifolio._doc) });
    } catch (e) {
      next(e)
    }
  }

  async update(req, res, next) {
    const {
      tipo,
      titulo,
      resumo,
      status,
      telefone__responsavel,
      idade__minima,
      tipo__localizacao,
      responsavel,
      endereco,
      fotos,
      data__ini__cand,
      data__fim__cand,
      data__ini__duracao,
      data__fim__duracao,
      ponto__coleta,
      servico__voluntario,
      tipo__campanha,
      disp__horarios,
    } = req.body;
    try {
      const portifolio = await Portifolio.findById(req.params.id).populate({ path: 'portifolio' });
      if (!portifolio) return res.send({ error: 'não existe.' })
      if (tipo) portifolio.tipo = tipo;
      if (titulo) portifolio.titulo = titulo;
      if (resumo) portifolio.resumo = resumo;
      if (endereco) portifolio.endereco = endereco;
      if (status) portifolio.status = status;
      if (telefone__responsavel) portifolio.telefone__responsavel = telefone__responsavel;
      if (idade__minima) portifolio.idade__minima = idade__minima;
      if (tipo__localizacao) portifolio.tipo__localizacao = tipo__localizacao;
      if (responsavel) portifolio.responsavel = responsavel;
      if (fotos) portifolio.fotos = fotos;
      if (data__ini__cand) portifolio.data__ini__cand = data__ini__cand;
      if (data__fim__cand) portifolio.data__fim__cand = data__fim__cand;
      if (data__ini__duracao) portifolio.data__ini__duracao = data__ini__duracao;
      if (data__fim__duracao) portifolio.data__fim__duracao = data__fim__duracao;
      if (ponto__coleta) portifolio.ponto__coleta = ponto__coleta;
      if (servico__voluntario) portifolio.servico__voluntario = servico__voluntario;
      if (tipo__campanha) portifolio.tipo__campanha = tipo__campanha;
      if (disp__horarios) portifolio.disp__horarios = disp__horarios;

      await portifolio.save();
      return res.send({ portifolio });
    } catch (e) {
      next(e)
    }
  }

  //PUT /images/:id
  async updateFotos(req, res, next) {
    try {
      const portifolio = await Portifolio.findOne({ _id: req.params.id });
      if (!portifolio) return res.status(400).send({ error: "Inscrição não encontrada." });

      const image = portifolio.fotos[0];
      if (image) promisify(fs.unlink)(path.resolve(__dirname, '..', 'public', 'portifolio', image))

      const novasImagens = req.files.map(item => item.filename);
      portifolio.fotos = novasImagens;

      await portifolio.save();

      return res.send({ portifolio });
    } catch (e) {
      next(e);
    }
  }
  async updateFrente(req, res, next) {
    try {
      const inscricoes = await Inscricoes.findOne({ _id: req.params.id });
      if (!inscricoes) return res.status(400).send({ error: "Inscrição não encontrada." });

      const image = inscricoes.doc__frente[0];
      if (image) promisify(fs.unlink)(path.resolve(__dirname, '..', 'public', 'doc__inscricao', image))

      const novasImagens = req.files.map(item => item.filename);
      inscricoes.doc__frente = novasImagens

      await inscricoes.save();

      return res.send({ inscricoes });
    } catch (e) {
      next(e);
    }
  }
  async updateVerso(req, res, next) {
    try {
      const inscricoes = await Inscricoes.findOne({ _id: req.params.id });
      if (!inscricoes) return res.status(400).send({ error: "Inscrição não encontrada." });

      const image = inscricoes.doc__verso[0];
      if (image) promisify(fs.unlink)(path.resolve(__dirname, '..', 'public', 'doc__inscricao', image))

      const novasImagens = req.files.map(item => item.filename);
      inscricoes.doc__verso = novasImagens

      await inscricoes.save();

      return res.send({ inscricoes });
    } catch (e) {
      next(e);
    }
  }
  async remove(req, res, next) {
    try {
      const portifolio = await Portifolio.findById(req.params.id).populate("portifolio");
      portifolio.deletado = true;
      await portifolio.save();
      return res.send({ deletado: true })
    } catch (e) {
      next(e);
    }
  }

}

module.exports = PortifolioController
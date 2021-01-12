const mongoose = require("mongoose");
const endOfDay = require('date-fns/endOfDay')
const startOfDay = require('date-fns/startOfDay')

const Candidatura = mongoose.model("Candidatura");
const Inscricoes = mongoose.model("Inscricoes");
const Usuario = mongoose.model("Usuario");
const RegistroPedido = mongoose.model("RegistroPedido");

const EmailController = require("./EmailController");

class CandidaturaController {

  // ADMIN
  // get /admin indexAdmin

  // async indexAdmin(req, res, next) {
  //   const { offset, limit } = req.query;
  //   try {
  //     const candidatura = await Candidatura
  //       .find()
  //       .populate(['portifolio', 'voluntario']);
  //     return res.send({ candidatura });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  async indexAdmin(req, res, next) {
    const { offset, limit } = req.query;
    try {
      const candidatura = await Candidatura
        .find({
          createdAt: {
            $gte: startOfDay(new Date('2020-11-01T00:00:00')),
            $lte: endOfDay(new Date('2020-12-31T00:00:00'))
          }
        })
        .populate(['portifolio', 'voluntario']);
      return res.send({ candidatura });
    } catch (e) {
      next(e);
    }
  }

  // get /admin/:id showAdmin
  async showAdmin(req, res, next) {
    try {
      const candidatura = await Candidatura
        .findOne({ _id: req.params.id })
        .populate(['portifolio', 'voluntario']);
      candidatura.voluntario = await Inscricoes.findOne({ usuario: candidatura.voluntario })
      return res.send({ candidatura });
    } catch (e) {
      next(e);
    }
  }

  // delete /admin/:id removeAdmin
  async removeAdmin(req, res, next) {
    try {
      const candidatura = await Candidatura.findOne({
        _id: req.params.id
      })

      if (!candidatura) return res.status(400).send({ error: "Candidatura não encontrada" });
      candidatura.cancelado = true;

      await candidatura.save();
      return res.send({ cancelado: true });
    } catch (e) {
      next(e);
    }
  }

  // VOLUNTÁRIO
  // get / index
  async index(req, res, next) {
    try {
      const usuario = await Usuario.findOne({ _id: req.payload.id });
      const candidatura = await Candidatura.find({ voluntario: usuario._id });
      return res.send({ candidatura });
    } catch (e) {
      next(e);
    }
  }

  // get /:id show
  async show(req, res, next) {
    try {
      const cliente = await Cliente.findOne({ usuario: req.payload.id });
      const pedido = await Pedido
        .findOne({ cliente: cliente._id, _id: req.params.id })
        .populate(["cliente", "pagamento", "entrega", "loja"]);
      pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
        item.produto = await Produto.findById(item.produto);
        item.variacao = await Variacao.findById(item.variacao);
        return item;

      }));
      const registros = await RegistroPedido.find({ pedido: pedido._id });
      return res.send({ pedido, registros });
    } catch (e) {
      next(e);
    }
  }

  // post / store
  async store(req, res, next) {
    try {
      const voluntario = await Usuario.findOne({ _id: req.payload.id }).populate({ path: "usuario", select: "_id nome email" });

      const candidatura = new Candidatura({
        voluntario: voluntario._id,
        portifolio: req.params.id
      });

      await candidatura.save();

      // const registroPedido = new RegistroPedido({
      //   pedido: pedido._id,
      //   tipo: "pedido",
      //   situacao: "pedido_criado"
      // });
      // await registroPedido.save();

      // EmailController.enviarNovoPedido({ pedido, usuario: cliente.usuario });
      // const administradores = await Usuario.find({ permissao: "admin", loja });
      // administradores.forEach((usuario) => {
      // EmailController.enviarNovoPedido({ pedido, usuario });
      // });

      return res.send({ candidatura });
    } catch (e) {
      next(e);
    }
  }

  // delete /:id remove
  async remove(req, res, next) {
    try {
      const usuario = await Usuario.findOne({ _id: req.payload.id });
      const candidatura = await Candidatura.findOne({ voluntario: usuario._id, _id: req.params.id });
      if (!candidatura) return res.status(400).send({ error: "candidatura não encontrada" });
      candidatura.cancelado = true;

      await candidatura.save();

      return res.send({ cancelado: true });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CandidaturaController;
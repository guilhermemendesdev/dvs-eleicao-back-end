const mongoose = require('mongoose');

const Pedido = mongoose.model('Pedido');
const Produto = mongoose.model('Produto');
const Variacao = mongoose.model('Variacao');
const Pagamento = mongoose.model('Pagamento');
const Entrega = mongoose.model('Entrega');
const Cliente = mongoose.model('Cliente');
const RegistroPedido = mongoose.model('RegistroPedido');

const CarrinhoValidation = require('./validacoes/carrinhoValidation');
const { calcularFrete } = require('./integracoes/correios');

class PedidoController {

    //ADM
    // get /admin
    async indexAdm(req, res, next) {
        const { offset, limit, loja } = req.query;
        try {
            const pedidos = await Pedido.paginate(
                { loja },
                {
                    offset: Number(offset || 0),
                    limit: Number(limit || 30),
                    populate: ['cliente', 'pagamento', 'entrega']
                }
            );
            pedidos.docs = await Promise.all(pedidos.docs.map(async (pedido) => {
                pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                    item.produto = await Produto.findById(item.produto);
                    item.variacao = await Variacao.findById(item.variacao);
                    return item;
                }));
                return pedido;
            }));
            return res.send({ pedidos });
        } catch (e) {
            next(e);
        }
    }

    // get /adm/:id
    async showAdm(req, res, next) {
        try {
            const pedido = await Pedido
                .findOne({ loja: req.query.loja, _id: req.params.id })
                .populate(['cliente', 'pagamento', 'entrega']);
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                item.produto = await Produto.findById(item.produto);
                item.variacao = await Variacao.findById(item.variacao);
                return item;
            }));

            const registros = await RegistroPedido.find({ pedido: pedido._id })
            return res.send({ pedido, registros })
        } catch (e) {
            next(e)
        }
    }


    //delete /adm/:id
    async removeAdm(req, res, next) {
        try {
            const pedido = await Pedido.findOne({ loja: req.query.loja, _id: req.params.id });
            if (!pedido) return res.status(400).send({ error: "Pedido não encontrado" });
            pedido.cancelado = true;

            //Registro de atividade = pedido cancelado
            //Enviar Email para cliente = pedido cancelado

            const registroPedido = new RegistroPedido({
                pedido: pedido._id,
                tipo: "pedido",
                situacao: "pedido_cancelado"
            });
            await registroPedido.save();

            await pedido.save();

            return res.send({ cancelado: true });
        } catch (e) {
            next(e)
        }
    }

    //get /adm/:id/carrinho
    async showCarrinhoPedidoAdm(req, res, next) {
        try {
            const pedido = await Pedido.findOne({ loja: req.query.loja, _id: req.params.id });
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                item.produto = await Produto.findById(item.produto);
                item.variacao = await Variacao.findById(item.variacao);
                return item;
            }));
            return res.send({ carrinho: pedido.carrinho })
        } catch (e) {
            next(e)
        }
    }

    //CLIENTE
    //get /
    async index(req, res, next) {
        const { offset, limit, loja } = req.query;
        try {
            const cliente = await Cliente.findOne({ usuario: req.payload.id });
            const pedidos = await Pedido.paginate(
                { loja, cliente: cliente._id },
                {
                    offset: Number(offset || 0),
                    limit: Number(limit || 30),
                    populate: ["cliente", "pagamento", "entrega"]
                }
            );
            pedidos.docs = await Promise.all(pedidos.docs.map(async (pedido) => {
                pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                    item.produto = await Produto.findById(item.produto);
                    item.variacao = await Variacao.findById(item.variacao);
                    return item;
                }));
                return pedido;
            }));
            return res.send({ pedidos });
        } catch (e) {
            next(e);
        }
    }
    //get /:id
    async show(req, res, next) {
        try {
            const cliente = await Cliente.findOne({ usuario: req.payload.id });
            const pedido = await Pedido
                .findOne({ cliente: cliente._id, _id: req.params.id })
                .populate(['cliente', 'pagamento', 'entrega']);
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                item.produto = await Produto.findById(item.produto);
                item.variacao = await Variacao.findById(item.variacao);
                return item;
            }));
            const registros = await RegistroPedido.find({ pedido: pedido._id })

            const resultado = await calcularFrete({ cep: "75120300", produtos: pedido.carrinho })

            return res.send({ resultado })
        } catch (e) {
            next(e)
        }
    }

    //post /
    async store(req, res, next) {
        const { carrinho, pagamento, entrega } = req.body;
        const { loja } = req.query;

        try {

            //CHECAR DADOS DO CARRINHO
            if (!await CarrinhoValidation(carrinho)) return res.status(422).send({ error: "Carrinho Inválido" });

            //CHECAR DODOS DE ENTREGA
            // if (!EntregaValidation(carrinho, entrega)) return res.status(422).send({ error: 'Dados de entrega inválidos' });

            //CHEGAR DADOS DO PAGAMENTO
            // if (!PagamentoValidation(carrinho, pagamento)) return res.status(422).send({ error: 'Dados de pagamento inválidos' });

            const cliente = await Cliente.findOne({ usuario: req.payload.id });

            const novoPagamento = new Pagamento({
                valor: pagamento.valor,
                forma: pagamento.forma,
                status: 'Iniciando',
                payload: pagamento,
                loja
            });

            const novaEntrega = new Entrega({
                status: 'nao_iniciado',
                custo: entrega.custo,
                prazo: entrega.prazo,
                tipo: entrega.tipo,
                payload: entrega,
                loja
            });

            const pedido = new Pedido({
                cliente: cliente._id,
                carrinho,
                pagamento: novoPagamento._id,
                entrega: novaEntrega._id,
                loja
            });
            novoPagamento.pedido = pedido._id;
            novaEntrega.pedido = pedido._id;

            await pedido.save();
            await novoPagamento.save();
            await novaEntrega.save();

            const registroPedido = new RegistroPedido({
                pedido: pedido._id,
                tipo: "pedido",
                situacao: "pedido_criado"
            });
            await registroPedido.save();

            //Notificar via email - cliente e adm = novo pedido

            return res.send({ pedido: Object.assign({}, pedido._doc, { entrega: novaEntrega, pagamento: novoPagamento, cliente }) })
        } catch (e) {
            next(e)
        }
    }

    //delete /:id
    async remove(req, res, next) {
        try {
            const cliente = await Cliente.findOne({ usuario: req.payload.id });
            if (!cliente) return res.status(400).send({ error: "Cliente não encontrado" });
            const pedido = await Pedido.findOne({ cliente: cliente._id, _id: req.params.id });
            if (!pedido) return res.status(400).send({ error: "Pedido não encontrado" });
            pedido.cancelado = true;

            //Registro de atividade = pedido cancelado
            //Enviar Email para cliente = pedido cancelado

            const registroPedido = new RegistroPedido({
                pedido: pedido._id,
                tipo: "pedido",
                situacao: "pedido_cancelado"
            });
            await registroPedido.save();

            await pedido.save();
            return res.send({ cancelado: true })
        } catch (e) {
            next(e)
        }
    }

    //get /:id/carrinho
    async showCarrinhoPedido(req, res, next) {
        try {
            const cliente = await Cliente.findOne({ usuario: req.payload.id });
            const pedido = await Pedido.findOne({ cliente: cliente._id, _id: req.params.id });
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                item.produto = await Produto.findById(item.produto);
                item.variacao = await Variacao.findById(item.variacao);
                return item;
            }));
            return res.send({ carrinho: pedido.carrinho })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = PedidoController;
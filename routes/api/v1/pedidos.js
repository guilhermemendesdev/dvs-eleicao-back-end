const router = require('express').Router();

const PedidoController = require('../../../controllers/PedidoController');
const { LojaValidation } = require('../../../controllers/validacoes/lojaValidation');
const { PedidoValidation } = require('../../../controllers/validacoes/pedidoValidation');

const validate = require('express-validation')
const auth = require('../../auth');

const pedidoController = new PedidoController();

//ADM
router.get('/adm', auth.required, LojaValidation.adm, validate(PedidoValidation.indexAdm), pedidoController.indexAdm);
router.get('/adm/:id', auth.required, LojaValidation.adm, validate(PedidoValidation.showAdm), pedidoController.showAdm);

router.delete('/adm/:id', auth.required, LojaValidation.adm, validate(PedidoValidation.removeAdm), pedidoController.removeAdm);

// -- carrinho
router.get('/adm/:id/carrinho', auth.required, LojaValidation.adm, validate(PedidoValidation.showCarrinhoPedidoAdm), pedidoController.showCarrinhoPedidoAdm);

//-- entrega

// -- pagamento

//CLIENTE
router.get('/', auth.required, validate(PedidoValidation.index), pedidoController.index);
router.get('/:id', auth.required, validate(PedidoValidation.show), pedidoController.show);

router.post('/', auth.required, validate(PedidoValidation.store), pedidoController.store);
router.delete('/:id', auth.required, validate(PedidoValidation.remove), pedidoController.remove);

// -- carrinho
router.get('/:id/carrinho', auth.required, validate(PedidoValidation.showCarrinhoPedido), pedidoController.showCarrinhoPedido);

// -- entrega

// -- pagamento


module.exports = router;
const router = require('express').Router();

const EntregaController = require('../../../controllers/EntregaController');

const validate = require('express-validation');
const { EntregaValidation } = require('../../../controllers/validacoes/entregaValidation');
const { LojaValidation } = require('../../../controllers/validacoes/lojaValidation');
const auth = require('../../auth');

const entregaController = new EntregaController();

router.get('/:id', auth.required, validate(EntregaValidation.show), entregaController.show);
router.put('/:id', auth.required, LojaValidation.adm, validate(EntregaValidation.update), entregaController.update);
router.post('/calcular', validate(EntregaValidation.calcular), entregaController.calcular);

module.exports = router;

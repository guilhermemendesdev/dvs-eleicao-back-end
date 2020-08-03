const router = require('express').Router();
const { LojaValidation } = require('../../../controllers/validacoes/lojaValidation');
const auth = require('../../auth');
const LojaController = require('../../../controllers/LojaController');

const lojaController = new LojaController();

router.get('/', lojaController.index); //testado
router.get('/:id', lojaController.show); //testado

router.post('/', auth.required, lojaController.store); //testado
router.put('/:id', auth.required, LojaValidation.adm, lojaController.update); //testado
router.delete('/:id', auth.required, LojaValidation.adm, lojaController.remove); //testado

module.exports = router;  
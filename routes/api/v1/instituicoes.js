const router = require('express').Router();
const InstituicoesController = require('../../../controllers/InstituicoesController');

const auth = require('../../auth');
const validate = require('express-validation');
const { AdmValidation } = require('../../../controllers/validacoes/admValidation');
const { InstituicoesValidation } = require('../../../controllers/validacoes/instituicoesValidation');

const instituicoesController = new InstituicoesController();

router.get('/', instituicoesController.index); //testado
router.post('/', auth.required, AdmValidation.adm, validate(InstituicoesValidation.store), instituicoesController.store); //testado
router.put('/:id', auth.required, AdmValidation.adm, validate(InstituicoesValidation.update), instituicoesController.update); //testado
router.delete("/:id", auth.required, AdmValidation.adm, validate(InstituicoesValidation.remove), instituicoesController.remove); //testado

module.exports = router;
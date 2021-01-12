const router = require('express').Router();
const FormacoesController = require('../../../controllers/FormacoesController');

const auth = require('../../auth');
const validate = require('express-validation');
const { AdmValidation } = require('../../../controllers/validacoes/admValidation');
const { FormacoesValidation } = require('../../../controllers/validacoes/formacoesValidation');

const formacoesController = new FormacoesController();

router.get('/', formacoesController.index); //testado
router.post('/', auth.required, AdmValidation.adm, validate(FormacoesValidation.store), formacoesController.store); //testado
router.put('/:id', auth.required, AdmValidation.adm, validate(FormacoesValidation.update), formacoesController.update); //testado
router.delete("/:id", auth.required, AdmValidation.adm, validate(FormacoesValidation.remove), formacoesController.remove); //testado

module.exports = router;
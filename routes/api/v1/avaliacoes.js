const router = require('express').Router();
const AvaliacaoController = require('../../../controllers/AvaliacaoController');
const { LojaValidation } = require('../../../controllers/validacoes/lojaValidation');
const validate = require('express-validation');
const { AvaliacaoValidation } = require('../../../controllers/validacoes/avaliacaoValidation');
const auth = require('../../auth');

const avaliacaoController = new AvaliacaoController();

//CLIENTES/VISITANTE
router.get('/', validate(AvaliacaoValidation.index), avaliacaoController.index);
router.get('/:id', validate(AvaliacaoValidation.show), avaliacaoController.show);
router.post('/', auth.required, validate(AvaliacaoValidation.store), avaliacaoController.store);

//ADM
router.delete('/:id', auth.required, LojaValidation.adm, validate(AvaliacaoValidation.remove), avaliacaoController.remove);

module.exports = router;
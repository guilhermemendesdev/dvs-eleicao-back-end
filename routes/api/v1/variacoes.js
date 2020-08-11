const router = require('express').Router();

const VariacaoController = require('../../../controllers/VariacaoController');
const { LojaValidation } = require('../../../controllers/validacoes/lojaValidation');
const auth = require('../../auth');
const upload = require('../../../config/multer');

const { VariacaoValidation } = require('../../../controllers/validacoes/variacaoValidation');
const validate = require('express-validation');

const variacaoController = new VariacaoController();

router.get('/', validate(VariacaoValidation.index), variacaoController.index);
router.get('/:id', validate(VariacaoValidation.show), variacaoController.show);

router.post("/", auth.required, LojaValidation.adm, validate(VariacaoValidation.store), variacaoController.store);
router.put('/:id', auth.required, LojaValidation.adm, validate(VariacaoValidation.update), variacaoController.update);
router.put('/images/:id', auth.required, LojaValidation.adm, validate(VariacaoValidation.uploadImages), upload.array('files', 4), variacaoController.uploadImages);
router.delete('/:id', auth.required, LojaValidation.adm, validate(VariacaoValidation.remove), variacaoController.remove);

module.exports = router;
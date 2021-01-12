const router = require('express').Router();

const ProdutoController = require('../../../controllers/ProdutoController');

const { LojaValidation } = require('../../../controllers/validacoes/lojaValidation');
const validate = require('express-validation');
const { ProdutoValidation } = require('../../../controllers/validacoes/produtoValidation');
const auth = require('../../auth');
const { upload } = require('../../../config/multer');

const produtoController = new ProdutoController();

//ADM
router.post('/', auth.required, LojaValidation.adm, validate(ProdutoValidation.store), produtoController.store);
router.put("/:id", auth.required, LojaValidation.adm, validate(ProdutoValidation.update), produtoController.update);
router.put('/images/:id', auth.required, LojaValidation.adm, validate(ProdutoValidation.updateImages), upload.array('files', 4), produtoController.updateImages);
router.delete('/:id', auth.required, LojaValidation.adm, validate(ProdutoValidation.remove), produtoController.remove);

//CLIENTES/VISITANTES
router.get('/', validate(ProdutoValidation.index), produtoController.index);
router.get("/disponiveis", validate(ProdutoValidation.indexDisponiveis), produtoController.indexDisponiveis);
router.get('/search/:search', validate(ProdutoValidation.search), produtoController.search);
router.get('/:id', validate(ProdutoValidation.show), produtoController.show)

//VARIACOES
router.get('/:id/variacoes', validate(ProdutoValidation.showVariacoes), produtoController.showVariacoes)

//AVALIACOES
router.get('/:id/avaliacoes', validate(ProdutoValidation.showAvaliacoes), produtoController.showAvaliacoes)
module.exports = router;
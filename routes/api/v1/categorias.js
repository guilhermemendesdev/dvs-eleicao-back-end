const router = require('express').Router();
const CategoriaController = require('../../../controllers/CategoriaController');

const auth = require('../../auth');
const validate = require('express-validation');
const { LojaValidation } = require('../../../controllers/validacoes/lojaValidation');
const { CategoriaValidation } = require('../../../controllers/validacoes/categoriaValidation');

const categoriaController = new CategoriaController();

router.get('/', validate(CategoriaValidation.index), categoriaController.index);
router.get('/disponiveis', validate(CategoriaValidation.indexDisponiveis), categoriaController.indexDisponiveis);
router.get('/:id', validate(CategoriaValidation.show), categoriaController.show);

router.post('/', auth.required, LojaValidation.adm, validate(CategoriaValidation.store), categoriaController.store);
router.put('/:id', auth.required, LojaValidation.adm, validate(CategoriaValidation.update), categoriaController.update);
router.delete("/:id", auth.required, LojaValidation.adm, validate(CategoriaValidation.remove), categoriaController.remove);

//ROTAS AO PRODUTO
router.get('/:id/produtos', categoriaController.showProdutos);
router.put('/:id/produtos', auth.required, LojaValidation.adm, categoriaController.updateProdutos);

module.exports = router;
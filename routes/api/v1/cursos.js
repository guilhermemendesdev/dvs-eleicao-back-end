const router = require('express').Router();
const CursosController = require('../../../controllers/CursosController');

const auth = require('../../auth');
const validate = require('express-validation');
const { AdmValidation } = require('../../../controllers/validacoes/admValidation');
const { CursosValidation } = require('../../../controllers/validacoes/cursosValidation');

const cursosController = new CursosController();

router.get('/', cursosController.index); //testado
router.post('/', auth.required, AdmValidation.adm, validate(CursosValidation.store), cursosController.store); //testado
router.put('/:id', auth.required, AdmValidation.adm, validate(CursosValidation.update), cursosController.update); //testado
router.delete("/:id", auth.required, AdmValidation.adm, validate(CursosValidation.remove), cursosController.remove); //testado

module.exports = router;
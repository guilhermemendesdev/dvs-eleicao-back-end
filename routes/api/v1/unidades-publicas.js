const router = require('express').Router();
const UnidadesPublicasController = require('../../../controllers/UnidadesPublicasController');

const auth = require('../../auth');
const validate = require('express-validation');
const { AdmValidation } = require('../../../controllers/validacoes/admValidation');
const { UnidadesPublicasValidation } = require('../../../controllers/validacoes/unidadesPublicasValidation');

const unidadesPublicasController = new UnidadesPublicasController();

router.get('/', unidadesPublicasController.index); //testado
router.get('/adm/:id', auth.required, AdmValidation.adm, unidadesPublicasController.show); //testado
router.post('/', auth.required, AdmValidation.adm, validate(UnidadesPublicasValidation.store), unidadesPublicasController.store); //testado
router.put('/:id', auth.required, AdmValidation.adm, validate(UnidadesPublicasValidation.update), unidadesPublicasController.update); //testado
router.delete("/:id", auth.required, AdmValidation.adm, validate(UnidadesPublicasValidation.remove), unidadesPublicasController.remove); //testado

module.exports = router;
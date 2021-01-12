const router = require('express').Router();
const PortifolioController = require('../../../controllers/PortifolioController');
const { uploadPortifolio } = require('../../../config/multer');

const auth = require('../../auth');
const validate = require('express-validation');
const { AdmValidation } = require('../../../controllers/validacoes/admValidation');
const { PortifolioValidation } = require('../../../controllers/validacoes/portifolioValidation');

const portifolioController = new PortifolioController();

router.get('/', portifolioController.index); //testado
router.get("/search/:search", portifolioController.search);
router.put('/fotos/:id', validate(PortifolioValidation.updateFotos), uploadPortifolio.array('files', 1), portifolioController.updateFotos); //testado
router.post('/', auth.required, AdmValidation.adm, validate(PortifolioValidation.store), portifolioController.store); //testado
router.put('/:id', auth.required, AdmValidation.adm, validate(PortifolioValidation.update), portifolioController.update); //testado
router.delete("/:id", auth.required, AdmValidation.adm, portifolioController.remove); //testado
router.get('/:id', validate(PortifolioValidation.show), portifolioController.show); //testado

module.exports = router;
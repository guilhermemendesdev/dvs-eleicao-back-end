const router = require('express').Router();
const CandidaturaController = require('../../../controllers/CandidaturaController');

const auth = require('../../auth');
const validate = require('express-validation');
const { AdmValidation } = require('../../../controllers/validacoes/admValidation');
const { CandidaturaValidation } = require('../../../controllers/validacoes/candidaturaValidation');

const candidaturaController = new CandidaturaController();

// ADM

router.get("/adm", auth.required, AdmValidation.adm, candidaturaController.indexAdmin);
router.get("/adm/:id", auth.required, AdmValidation.adm, validate(CandidaturaValidation.showAdmin), candidaturaController.showAdmin);
router.delete("/adm/:id", auth.required, AdmValidation.adm, candidaturaController.removeAdmin);

// VOLUNTÁRIO

router.get("/", auth.required, candidaturaController.index);
router.post("/:id", auth.required, candidaturaController.store);
router.delete("/:id", auth.required, candidaturaController.remove);


module.exports = router;
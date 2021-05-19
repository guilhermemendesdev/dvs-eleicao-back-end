const router = require("express").Router();

const CandidatoController = require("../../../controllers/CandidatoController");
const { CandidatoValidation } = require("../../../controllers/validacoes/candidatoValidation");
const { AdmValidation } = require("../../../controllers/validacoes/admValidation");
const upload = require('../../../config/multer');

const validate = require("express-validation");
const auth = require("../../auth");

const candidatoController = new CandidatoController();

// POPULAÇÃO
// router.get("/", auth.required, candidatoController.showAll); //testado

// ADM

router.post("/", auth.required, AdmValidation.adm, validate(CandidatoValidation.store), candidatoController.store); //testado
router.put('/images/:id', auth.required, AdmValidation.adm, validate(CandidatoValidation.updateFoto), upload.array('file', 1), candidatoController.updateFoto); //testado
router.put("/:id", auth.required, AdmValidation.adm, validate(CandidatoValidation.update), candidatoController.update); //testado
router.delete("/:id", auth.required, AdmValidation.adm, validate(CandidatoValidation.update), candidatoController.remove); //testado

router.get("/", auth.required, validate(CandidatoValidation.showAll), candidatoController.showAll); //testado
router.get("/:id", auth.required, validate(CandidatoValidation.showAdm), candidatoController.showAdm); //testado
router.get("/numero/:numero_candidato", validate(CandidatoValidation.search), candidatoController.search); //testado


module.exports = router;
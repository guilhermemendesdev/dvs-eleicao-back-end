const router = require("express").Router();

const CandidatoController = require("../../../controllers/CandidatoController");
const { CandidatoValidation } = require("../../../controllers/validacoes/candidatoValidation");
const { ZonaValidation } = require("../../../controllers/validacoes/zonaValidation");
const upload = require('../../../config/multer');

const validate = require("express-validation");
const auth = require("../../auth");

const candidatoController = new CandidatoController();

// POPULAÇÃO
// router.get("/", auth.required, candidatoController.showAll); //testado

// ADM

router.post("/", auth.required, ZonaValidation.adm, validate(CandidatoValidation.store), candidatoController.store); //testado
router.put('/images/:id', auth.required, ZonaValidation.adm, validate(CandidatoValidation.updateFoto), upload.array('file', 1), candidatoController.updateFoto); //testado
router.put("/:id", auth.required, ZonaValidation.adm, validate(CandidatoValidation.update), candidatoController.update); //testado
router.delete("/:id", auth.required, ZonaValidation.adm, validate(CandidatoValidation.update), candidatoController.remove); //testado

router.get("/", auth.required, ZonaValidation.adm, candidatoController.showAll); //testado
router.get("/:id", auth.required, ZonaValidation.adm, validate(CandidatoValidation.showAdm), candidatoController.showAdm); //testado
//router.get("/chapa/:numero_candidato", ZonaValidation.adm, validate(CandidatoValidation.search), candidatoController.search); //testado


module.exports = router;
const router = require("express").Router();

const CandidatoController = require("../../../controllers/CandidatoController");
const { CandidatoValidation } = require("../../../controllers/validacoes/candidatoValidation");
const { ZonaValidation } = require("../../../controllers/validacoes/zonaValidation");
const { upload, uploadCandidato } = require('../../../config/multer')
const multer = require('multer')

const validate = require("express-validation");
const auth = require("../../auth");

const candidatoController = new CandidatoController();

// POPULAÇÃO
// router.get("/", auth.required, candidatoController.showAll); //testado

// ADM

router.post("/", validate(CandidatoValidation.store), candidatoController.store); //testado
router.put('/images/:id', auth.required, ZonaValidation.adm, validate(CandidatoValidation.updateFoto), multer(upload).single("file"), candidatoController.updateFoto); //testado
router.put('/docs/:id', auth.required, ZonaValidation.adm, validate(CandidatoValidation.uploadDocs), multer(uploadCandidato).single("file"), candidatoController.uploadDocs); //testado
router.put("/:id", auth.required, ZonaValidation.adm, validate(CandidatoValidation.update), candidatoController.update); //testado
router.delete("/:id", auth.required, ZonaValidation.adm, validate(CandidatoValidation.update), candidatoController.remove); //testado
router.get("/protocolo", candidatoController.searchProtocolo); //testado
router.get("/", auth.required, ZonaValidation.adm, candidatoController.showAll); //testado
router.get("/:id", auth.required, ZonaValidation.adm, validate(CandidatoValidation.showAdm), candidatoController.showAdm); //testado

module.exports = router;
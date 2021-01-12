const router = require("express").Router();

const InscricoesController = require("../../../controllers/InscricoesController");
const { InscricoesValidation } = require("../../../controllers/validacoes/inscricoesValidation");
const { AdmValidation } = require("../../../controllers/validacoes/admValidation");
const { upload } = require('../../../config/multer');

const validate = require("express-validation");
const auth = require("../../auth");

const inscricoesController = new InscricoesController();

// ADM

router.get("/adm", auth.required, AdmValidation.adm, validate(InscricoesValidation.index), inscricoesController.index); //testado
router.get("/search/:search", auth.required, AdmValidation.adm, validate(InscricoesValidation.search), inscricoesController.search); //testado
router.get("/adm/:id", auth.required, AdmValidation.adm, validate(InscricoesValidation.showAdm), inscricoesController.showAdm); //testado
router.delete("/adm/:id", auth.required, AdmValidation.adm, inscricoesController.removeAdm); //testado
router.put("/adm/:id", auth.required, AdmValidation.adm, validate(InscricoesValidation.updateAdm), inscricoesController.updateAdm); //testado

// CANDIDATO

router.get("/", auth.required, inscricoesController.show); //testado

router.post("/", validate(InscricoesValidation.store), inscricoesController.store); //testado
router.put('/foto/:id', validate(InscricoesValidation.updateFoto), upload.array('files', 1), inscricoesController.updateFoto); //testado
router.put('/frente/:id', validate(InscricoesValidation.updateFrente), upload.array('files', 1), inscricoesController.updateFrente); //testado
router.put('/verso/:id', validate(InscricoesValidation.updateVerso), upload.array('files', 1), inscricoesController.updateVerso); //testado
router.put("/:id", auth.required, validate(InscricoesValidation.update), inscricoesController.update); //testado
router.delete("/:id", auth.required, inscricoesController.remove); //testado


module.exports = router;
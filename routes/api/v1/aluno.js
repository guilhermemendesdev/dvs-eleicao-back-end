const router = require("express").Router();

const AlunoController = require("../../../controllers/alunoController");
const { ZonaValidation } = require("../../../controllers/validacoes/zonaValidation");
const { AlunoValidation } = require("../../../controllers/validacoes/alunoValidation");
const upload = require('../../../config/multer');

const validate = require("express-validation");
const auth = require("../../auth");

const alunoController = new AlunoController();

// ADM
router.get('/adm', auth.required, ZonaValidation.adm, alunoController.indexAdm);
router.get('/', alunoController.showAll);
router.get('/adm/:id', auth.required, ZonaValidation.adm, alunoController.showAdm);
router.get("/adm/search/:search", auth.required, ZonaValidation.adm, alunoController.searchAlunos);
// router.post("/", auth.required, AdmValidation.adm, validate(ZonaValidation.store), alunoController.store); //testado
// router.put("/:id", auth.required, ZonaValidation.adm, validate(AlunoValidation.update), alunoController.update); //testado
// router.delete("/:id", auth.required, AdmValidation.adm, validate(ZonaValidation.remove), alunoController.remove); //testado

// // POPULAÇÃO
// router.get("/", validate(ZonaValidation.adm), alunoController.showAll); //testado
// router.get("/:id", validate(ZonaValidation.adm), alunoController.showAdm); //testado



module.exports = router;
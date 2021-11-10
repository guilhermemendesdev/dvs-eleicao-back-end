const router = require("express").Router();

const FuncionarioController = require("../../../controllers/FuncionarioController");
const { ZonaValidation } = require("../../../controllers/validacoes/zonaValidation");
const { FuncionarioValidation } = require("../../../controllers/validacoes/funcionarioValidation");
const upload = require('../../../config/multer');

const validate = require("express-validation");
const auth = require("../../auth");

const funcionarioController = new FuncionarioController();

// ADM
router.get('/', auth.required, ZonaValidation.adm, funcionarioController.indexAdm);
router.get('/:id', auth.required, ZonaValidation.adm, funcionarioController.showAdm);
router.get("/search/:search", auth.required, ZonaValidation.adm, funcionarioController.searchAlunos);
router.get('/lista/lista', funcionarioController.showAll);
// router.post("/", auth.required, AdmValidation.adm, validate(ZonaValidation.store), funcionarioController.store); //testado
// router.put("/:id", auth.required, ZonaValidation.adm, validate(AlunoValidation.update), funcionarioController.update); //testado
// router.delete("/:id", auth.required, AdmValidation.adm, validate(ZonaValidation.remove), funcionarioController.remove); //testado

// // POPULAÇÃO
// router.get("/", validate(ZonaValidation.adm), funcionarioController.showAll); //testado
// router.get("/:id", validate(ZonaValidation.adm), funcionarioController.showAdm); //testado



module.exports = router;
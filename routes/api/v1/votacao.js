const router = require("express").Router();

const VotacaoController = require("../../../controllers/VotacaoController");
const { VotacaoValidation } = require("../../../controllers/validacoes/votacaoValidation");
const { ZonaValidation } = require("../../../controllers/validacoes/zonaValidation");
const { AdmValidation } = require("../../../controllers/validacoes/admValidation");
const upload = require('../../../config/multer');

const validate = require("express-validation");
const auth = require("../../auth");

const votacaoController = new VotacaoController();

// POPULAÇÃO
// router.get("/", auth.required, votacaoController.showAll); //testado

// ADM

router.post("/", auth.required, ZonaValidation.adm, votacaoController.store); //testado
router.put('/:id', auth.required, AdmValidation.adm, votacaoController.finalizarVotacao); //testado
router.get("/", auth.required, ZonaValidation.adm, votacaoController.showAll); //testado
router.get("/resultado", auth.required, AdmValidation.adm, votacaoController.showVotacaoFinalizada); //testado
router.get("/:id", auth.required, AdmValidation.adm, votacaoController.showAdm); //testado
// router.get("/resultado", votacaoController.showResultado); //testado
// router.put("/:id", auth.required, validate(VotacaoValidation.update), votacaoController.update); //testado
// router.delete("/:id", auth.required, votacaoController.removeAdm); //testado

module.exports = router;
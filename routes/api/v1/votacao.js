const router = require("express").Router();

const VotacaoController = require("../../../controllers/VotacaoController");
const { VotacaoValidation } = require("../../../controllers/validacoes/votacaoValidation");
const { ZonaValidation } = require("../../../controllers/validacoes/zonaValidation");
const upload = require('../../../config/multer');

const validate = require("express-validation");
const auth = require("../../auth");

const votacaoController = new VotacaoController();

// POPULAÇÃO
// router.get("/", auth.required, votacaoController.showAll); //testado

// ADM

router.post("/", auth.required, ZonaValidation.adm, votacaoController.store); //testado
// router.put('/images/:id', auth.required, validate(VotacaoValidation.updateFoto), upload.array('file', 1), votacaoController.updateFoto); //testado
router.get("/", auth.required, ZonaValidation.adm, votacaoController.showAll); //testado
// router.get("/:id", auth.required, validate(VotacaoValidation.showAdm), votacaoController.showAdm); //testado
// router.put("/:id", auth.required, validate(VotacaoValidation.update), votacaoController.update); //testado
// router.delete("/:id", auth.required, votacaoController.removeAdm); //testado

module.exports = router;
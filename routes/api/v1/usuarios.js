const router = require("express").Router();
const auth = require("../../auth");
const { AdmValidation } = require("../../../controllers/validacoes/admValidation");
const UsuarioController = require("../../../controllers/UsuarioController");
const { uploadUsuario } = require('../../../config/multer');

const validate = require("express-validation");
const { UsuarioValidation } = require("../../../controllers/validacoes/usuarioValidation");

const usuarioController = new UsuarioController();

router.post("/login", validate(UsuarioValidation.login), usuarioController.login); //testado
router.post("/registrar", validate(UsuarioValidation.store), usuarioController.store); //testado
router.put("/", auth.required, validate(UsuarioValidation.update), usuarioController.update); //testado
router.delete("/", auth.required, usuarioController.remove); //testado
router.get("/candidaturas", auth.required, usuarioController.showCandidaturaVoluntario);

router.get("/recuperar-senha", usuarioController.showRecovery); //testado
router.post("/recuperar-senha", usuarioController.createRecovery); //testado
router.get("/senha-recuperada", usuarioController.showCompleteRecovery); //testado
router.post("/senha-recuperada", usuarioController.completeRecovery); //testado

router.get("/search/:search", usuarioController.search); //testado
router.get("/", auth.required, usuarioController.index); //testado
router.get("/adm", auth.required, AdmValidation.adm, usuarioController.indexAdm); //testado
router.get("/:id", auth.required, validate(UsuarioValidation.show), usuarioController.show); // testado
router.put('/fotos/:id', auth.required, uploadUsuario.array('files', 1), usuarioController.updateImagem); //testado

module.exports = router;
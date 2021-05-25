const router = require("express").Router();

const ChapaController = require("../../../controllers/chapaController");
const { ChapaValidation } = require("../../../controllers/validacoes/chapaValidation");
const { ZonaValidation } = require("../../../controllers/validacoes/zonaValidation");
const upload = require('../../../config/multer');

const validate = require("express-validation");
const auth = require("../../auth");

const chapaController = new ChapaController();

// ADM
router.post("/adm", auth.required, ZonaValidation.adm, validate(ChapaValidation.store), chapaController.store); //testado
router.put("/adm/:id", auth.required, ZonaValidation.adm, validate(ChapaValidation.update), chapaController.update); //testado
router.delete("/:id", auth.required, ZonaValidation.adm, validate(ChapaValidation.remove), chapaController.remove); //testado

// POPULAÇÃO
router.get("/", validate(ChapaValidation.index), chapaController.index); //testado
router.get("/:id", validate(ChapaValidation.show), chapaController.show); //testado



module.exports = router;
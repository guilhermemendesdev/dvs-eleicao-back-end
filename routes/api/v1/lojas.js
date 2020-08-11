const router = require("express").Router();

const auth = require("../../auth");
const validate = require("express-validation");
const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");

const LojaController = require("../../../controllers/LojaController");
const lojaController = new LojaController();

router.get("/", lojaController.index); // testado
router.get("/:id", validate(LojaValidation.show), lojaController.show); // testado

router.post("/", auth.required, validate(LojaValidation.store), lojaController.store); // testado
router.put("/:id", auth.required, LojaValidation.adm, validate(LojaValidation.update), lojaController.update); // testado
router.delete("/:id", auth.required, LojaValidation.adm, lojaController.remove); // testado

module.exports = router;
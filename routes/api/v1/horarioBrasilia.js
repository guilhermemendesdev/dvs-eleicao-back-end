const router = require("express").Router();

const HorarioBrasiliaController = require("../../../controllers/HorarioBrasiliaController");
const { ZonaValidation } = require("../../../controllers/validacoes/zonaValidation");
const { FuncionarioValidation } = require("../../../controllers/validacoes/funcionarioValidation");
const upload = require('../../../config/multer');

const validate = require("express-validation");
const auth = require("../../auth");

const horarioBrasiliaController = new HorarioBrasiliaController();

// ADM
router.get('/', horarioBrasiliaController.index);



module.exports = router;
const router = require("express").Router();

const ClienteController = require("../../../controllers/ClienteController");
const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");
const { ClienteValidation } = require("../../../controllers/validacoes/clienteValidation");
const Validation = require("express-validation");
const auth = require("../../auth");

const clienteController = new ClienteController();

// ADM
router.get("/", auth.required, LojaValidation.adm, Validation(ClienteValidation.index), clienteController.index);
//router.get("/search/:search/pedidos", auth.required, LojaValidation.adm, Validation(ClienteValidation.searchPedidos), clienteController.searchPedidos);
router.get("/search/:search", auth.required, LojaValidation.adm, Validation(ClienteValidation.search), clienteController.search);
router.get("/adm/:id", auth.required, LojaValidation.adm, Validation(ClienteValidation.showAdm), clienteController.showAdm);
//router.get("/adm/:id/pedidos", auth.required, LojaValidation.adm, Validation(ClienteValidation.showPedidosCliente), clienteController.showPedidosCliente);

//router.delete("/adm/:id", auth.required, LojaValidation.adm, clienteController.removeAdm);

router.put("/adm/:id", auth.required, LojaValidation.adm, Validation(ClienteValidation.updateAdm), clienteController.updateAdm);

// CLIENTE
router.get("/:id", auth.required, Validation(ClienteValidation.show), clienteController.show);

router.post("/", Validation(ClienteValidation.store), clienteController.store);
router.put("/:id", auth.required, Validation(ClienteValidation.update), clienteController.update);
router.delete("/:id", auth.required, clienteController.remove);


module.exports = router;
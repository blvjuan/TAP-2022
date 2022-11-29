const express = require("express");
const router = express.Router();
usuario_ctlr = require("../controllers/usuariosController");
jwt = require("../controllers/jwt");


//RUTAS DE NUESTRA API
router.get("/", usuario_ctlr.index);
router.get("/usuarios", usuario_ctlr.getAllUsuarios);

router.post("/usuarios", usuario_ctlr.postUsuario );

router.post("/usuarios/:dni/solicitudes", usuario_ctlr.solicitarExamen);

router.get("/usuarios/:dni", usuario_ctlr.getUsuario);
//router.patch("/usuarios/:dni", usuario_ctlr.patchUsuario);

router.post("/signin",jwt.signIn)
router.get("/welcome", jwt.welcome)
//router.post("/refresh", refresh)


module.exports = router;

const express = require("express");
const router = express.Router();
examenes_ctlr = require("../controllers/examenesController");
router.get("/examenes", examenes_ctlr.getAllExamenes);
router.get("/examenes/:token", examenes_ctlr.rendirExamen);
router.post("/examenes/:token", examenes_ctlr.enviarRespuestas);

module.exports = router;

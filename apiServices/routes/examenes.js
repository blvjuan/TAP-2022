const express = require("express");
const router = express.Router();
examenes_ctlr = require("../controllers/examenesController");
router.get("/examenes", examenes_ctlr.getAllExamenes);
router.post("/examenes/:token", examenes_ctlr.rendirExamen);

module.exports = router;

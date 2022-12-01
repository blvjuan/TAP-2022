const mongoose = require("mongoose");
const { model, Schema } = mongoose;

require('../dbconnection/mongoConection')
require("../models/examenesModel");

const examenesSch = new Schema({
    token: String,
    preguntas: [{ type: Schema.Types.ObjectId, ref: 'preguntas'}],

    respuestas: [{indice: Number, respUser: Boolean}],
    finalizado: Boolean,
    nota:Number,
    dniSolcitante: Number,
});
const ExamenesModel = mongoose.model("examenes", examenesSch);



module.exports =  ExamenesModel;


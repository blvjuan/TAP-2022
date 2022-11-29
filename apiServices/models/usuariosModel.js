const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const usuarioSch = new Schema({
    dni: String,
    nombre: String,
    intentos: Number,
    tokens: [String],
    vision: Boolean
});
const UsuarioModel = mongoose.model("usuarios", usuarioSch);

module.exports =  UsuarioModel;


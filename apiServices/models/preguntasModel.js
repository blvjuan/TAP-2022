const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const preguntasSch = new Schema({
    _id: Schema.Types.ObjectId,
    indice: Number, 
    desc: String, 
    resp: Boolean
});
const PreguntasModel = mongoose.model("preguntas", preguntasSch);



module.exports = PreguntasModel;


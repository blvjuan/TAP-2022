const ExamenesModel = require("../models/examenesModel");
const PreguntasModel = require("../models/preguntasModel");
const UsuarioModel = require("../models/usuariosModel");



exports.getAllExamenes = async (req, res) => {
   
    try {
        //const doc = await ExamenesModel.find({});
        const user = await ExamenesModel.find({}).populate('preguntas');
        console.log(user[0].preguntas);
        return res.json({ user });  // estructura de retorno

    } catch (error) {
        res.status(500).send('Error interno del servidor  🍔 :('); // codigo alternativo

    }
};
exports.rendirExamen = async (req, res) => {
    const {token} = req.params;
    try {
        console.log("get user con token " + token)
        const doc = await UsuarioModel.findOne({ token: token });
        if (doc == undefined || doc == "") {
            res.status(404).send("Examen no encontrado")
        }
        else{
            console.log("o por token",doc);
        }
        

    } catch (error) {
        throw new Error("Error en servidor")

    }


    
}

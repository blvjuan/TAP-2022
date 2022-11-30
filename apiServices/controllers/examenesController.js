const { response } = require("express");
const ExamenesModel = require("../models/examenesModel");
const PreguntasModel = require("../models/preguntasModel");
const services = require("../services/examenesServ");



exports.getAllExamenes = async (req, res) => {
   
    try {
        //const doc = await ExamenesModel.find({});
        const user = await ExamenesModel.find({}).populate('preguntas');
        return res.json({ user });  // estructura de retorno

    } catch (error) {
        res.status(500).send('Error interno del servidor  🍔 :('); // codigo alternativo

    }
};
exports.rendirExamen = async (req, res) => {
    const {token} = req.params;

    try {
      valido = await services.validarToken(token);
        if(valido){

            a=await services.generarExamen(token);
            
            res.status(200).send(a); 

        }else{
            res.status(404).send('Token invalido '); // codigo alternativo

        }



    } catch (error) {
        res.status(500).send('error :  '+error); // codigo alternativo

    }
    
}


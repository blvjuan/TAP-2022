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
    const { token } = req.params;

    try {
        const tokValido = await services.validarToken(token);
        if (tokValido) {

            const examExist = await services.examenExist(token);
            if (examExist) {

                const mostrar = await services.getExamen(token, true); //poner en false TO DO

                res.status(200).send(mostrar);


            } else {
                const exa = await services.generarExamen(token);

                res.status(200).send(exa);
            }



        } else {
            res.status(404).send('Token invalido '); // codigo alternativo

        }



    } catch (error) {
        res.status(500).send('error :  ' + error); // codigo alternativo

    }

}

exports.enviarRespuestas = async (req, res) => {
    const { token } = req.params;
    const data = req.body;
    

    try {

        await services.postRespuestas(token, data);
        
        
        res.status(201).send(data); // codigo alternativo


    } catch (error) {
        console.log("error al realizar postRespuestas");
        res.status(500).send('error al realizar postRespuestas :  ' + error); // codigo alternativo

    }



}


exports.getNota = async (req, res) => {
    const { token } = req.params;
    

    try {
        
        let nota = await services.contNota(token);
        if(nota>=8){
            res.status(200).send("Aprobado: Su nota final es un "+nota)

        }
        else{
            res.status(200).send("Desaprobado: Su nota final es un "+nota + " debe volver a generar un token y rendir el examen")

        }
        

    } catch (error) {
        res.status(500).send('error al realizar getNota :  ' + error); // codigo alternativo

    }



}
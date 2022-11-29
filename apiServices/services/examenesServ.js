const UsuarioModel = require("../models/usuariosModel");
const ExamenesModel = require("../models/examenesModel");

const PreguntasModel = require("../models/preguntasModel");

module.exports.validarToken = async (token) => {
    try {

        console.log("validar " + token)
        const doc = await UsuarioModel.findOne({ tokens: token });
        const exa = await ExamenesModel.findOne({ tokens: token });

        if (doc == undefined || doc == "" && exa) {
            console.log("token invalido ");
            return false;

        }
        else {
            console.log("token valido ");

            //validar fechas
            return true;
        }


    } catch (error) {
        console.log("Error en servidor " + error);

    }


}
module.exports.generarExamen = async (token) => {

    let randoms = [];
    cantPreg = 5;
    try {

        const doc = await PreguntasModel.find({});

        let res = [];

        while (randoms.length < cantPreg) {
            let random = getRandomInt(doc.length);
            if (randoms.indexOf(random) == -1) {
                randoms.push(random);
                res[randoms.length - 1] = doc[random];
            }
        }
        const respIDs = res.map(el => ({ _id: el._id, }));


        guardarExamen(token, respIDs);


        const finalRes = res.map(el => ({
            indice: el.indice,
            desc: el.desc
        }))



        return finalRes;


    } catch (error) {
        console.log("Error en servidor " + error);

    }


}
async function  guardarExamen(token, res) {
    let examen = new ExamenesModel({
        token: token,
        preguntas: res
    })
    try {
        examen.save({});
        console.log("guardando examen")

    } catch (error) {
        console.log("error guardando examen", error);

    }

}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

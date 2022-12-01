const UsuarioModel = require("../models/usuariosModel");
const ExamenesModel = require("../models/examenesModel");

const PreguntasModel = require("../models/preguntasModel");
const { find } = require("../models/examenesModel");

module.exports.validarToken = async (token) => {
    try {

        console.log("validar " + token)
        const doc = await UsuarioModel.findOne({ tokens: token });

        if (doc == undefined || doc == "") {
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
    cantPreg = 10 ;
    try {

        const doc = await PreguntasModel.find({});

        let res = [];
        
        while (randoms.length < cantPreg) {
            let random = getRandomInt(doc.length);
            if (randoms.indexOf(random) == -1) {
                randoms.push(random);
                res[randoms.length-1] = doc[random];

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

module.exports.getExamen = async (token, getResp) => {

    try {
        const examen = await ExamenesModel.findOne({ token: token }).populate('preguntas');
        let finalRes = null;
        if (getResp == true) {
            console.log("respuestas activadas.............. ")
            finalRes = examen.preguntas.map(el => ({
                indice: el.indice,
                desc: el.desc,
                respuestas: el.resp
            }))
        } else {
            finalRes = examen.preguntas.map(el => ({
                indice: el.indice,
                desc: el.desc,
            }))

        }

        return finalRes;
    } catch (error) {
        console.log("error mostrando examen", error);

    }

}
module.exports.examenExist = async (token) => {
    try {
        //verificar la fecha TO DO
        const exa = await ExamenesModel.findOne({ token: token });

        if (exa == undefined || exa == "") {
            console.log("generar examen");
            return false;

        }
        else {
          //  console.log("examen existente");

            //validar fechas
            return true;
        }


    } catch (error) {
        console.log("Error en servidor " + error);

    }


}

module.exports.postRespuestas = async (token, body) => {
    try {
        //verificar la fecha TO DO

        const exa = await ExamenesModel.findOne({ token: token })

        exa.finalizado=true;
        exa.respuestas=body;
        exa.save();
    
    }
    catch {
        console.log("error post respuesta");
    }
}
module.exports.contNota = async (token) => {
    try {
        //verificar la fecha TO DO
        let nota = 0;
        let exa = await ExamenesModel.findOne({ token: token }).populate("preguntas");

        let respUser = exa.respuestas
        exa.preguntas.forEach(correcta => {
           // console.log("resp corre desc ---->:",correcta.resp)

            respUser.forEach(rtasUser => {
                    
                if(correcta.indice == rtasUser.indice && correcta.resp ==rtasUser.respUser ){
                    nota++;
                }

           });
        });
        //console.log("nota : ", nota);
        exa.nota = nota;

        exa.save();
        return nota;

    }
    catch {
        console.log("error contNota");
    }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function guardarExamen(token, res) {
    let examen = new ExamenesModel({
        token: token,
        preguntas: res,
        finalizado: false
    })
    try {
        examen.save({});
        console.log("guardando examen")

    } catch (error) {
        console.log("error guardando examen", error);

    }

}



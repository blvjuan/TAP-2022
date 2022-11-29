const UsuarioModel = require("../models/usuariosModel");
const token = require ("../services/tokenGenerator")




exports.index = (req, res) => {
    res.send("Bienvenido a la API :D  ( ͡( ͡👁️ ͜ʖ ͡👁️)️)✌");
};

//GET USUARIO BY DNI
exports.getUsuario = async (req, res) => {
    const { dni } = req.params;
    try {
        const usuario = await usuarioByDni(dni);
        if (usuario) {
            return res.json({ usuario });
        } else {
            res.status(404).send("(👁️ ͜ʖ👁️) Usuario no encontrado");
        }


    } catch (error) {
        res.send('Error de servidor 🍔 :('); // codigo alternativo

    }
};

async function usuarioByDni(dni) {

    try {

        console.log("get user con dni " + dni)
        const doc = await UsuarioModel.find({ dni: dni });
        console.log("doc" + doc)
        if (doc == undefined || doc == "") {
            console.log("usario no encontrado");
            return false;
        }
        return doc;

    } catch (error) {
        throw new Error("Error en servidor")

    }

}
//GET ALL USUARIOS

exports.getAllUsuarios = async (req, res) => {

    try {
        const doc = await UsuarioModel.find({});
        return res.json({ doc });  // estructura de retorno

    } catch (error) {
        res.status(500).send('Error interno del servidor  🍔 :('); // codigo alternativo

    }
};

//POST USUARIO


exports.postUsuario = async (req, res) => {    // DATOS NECESARIOS PARA REGISTRAR UN USUARIO: NOMBRE , DNI

    const { dni, nombre } = req.body;   // VALIDAR DNI REPETIDO TO DO

    usuarioNuevo = new UsuarioModel({
        dni: dni,
        nombre: nombre,
        intentos: 0,
        tokens: [],
    });

// VALIDA SI LA CUENTA YA ESTÁ CREADA EN LA BD
    let existe;
    const usr = await usuarioByDni(dni);
    if(usr){
         existe = usr[0].dni == dni
    }
    if (!existe) {
        usuarioNuevo.save(function (err) {
            if (err) return handleError(err);
            // guardamos en bd!
            console.log("USUARIO creado dni: " + dni)
            res.status(200).json({ dni, nombre })
        });
    }
    else{
        res.status(400).send("Cuenta ya existente");
    }

};

//PATCH USUARIO BY DNI
/*
exports.patchUsuario = async (req, res) => {
    let { dni } = req.params;
    let { vision } = req.body;
    try {
        const doc = await UsuarioModel.findOneAndUpdate({ dni: dni }, { vision: vision });
        console.log("patch todo ok");

        return res.json({ doc, vision: vision });  // estructura de retorno

    } catch (error) {
        res.status(500).send('Error en servidor 🍔 :('); // codigo alternativo

    }

};*/

// solicitud para rendir el examen
exports.solicitarExamen = async (req, res) => {
    let { dni } = req.params;
    let { vision } = req.body;//!vision == true ||
    if( vision !=false && vision != true){
        console.log("visonasa "+vision);

            return res.send("👓 Debe confirmar si utiliza anteojos antes de rendir el examen 👓 ")
            // debe confirme el estado de su vista 
        
    }

    try {

        console.log("Solicutud de user con dni " + dni +" vision"+vision)
        const user = await UsuarioModel.findOneAndUpdate({ dni: dni }, { vision: vision });    //trae una version vieja de vision



        let sinAnteojos = null;

        if (user.intentos >= 3 ||user.intentos < 0  ) {
            res.status(404).send('Numero de intentos superado o invalido'); // codigo alternativo

        } else {
            if (vision == false) {
                // generar examen vista
                const turno = randomDate(new Date() , new Date(2023, 0, 1) );
                
                return res.send("Debera presentarse a un examen de vision el día: "+ turno)
            }
            else {
                if (vision == true && user.intentos <= 3) {

                    //generar examen real
                    console.log("token generado: "+token.generar())
                    return res.send("Puede rendir. El token de su examen es" + token.generar())

                }
                
            }
        }
    } catch (error) {
        res.status(500).send('Error en solicitud 🍔 :('+error); // codigo alternativo

    }
    
};


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  

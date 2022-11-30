const mongoose = require("mongoose");
// CONVERTIR EN VARIABLE DE CONFIG
const uri = "mongodb+srv://Juanz:tap2022@cluster0.fr3btfg.mongodb.net/finaltap?retryWrites=true&w=majority";
 mongoose.connect(uri).then(() => {  
    console.log("conecta2 a la bd");

}).catch(err => {
    console.error("Error en conexion BD "+err);

});
//module.exports = connection;
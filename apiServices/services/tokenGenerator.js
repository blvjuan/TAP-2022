 const crypto = require('crypto');
 module.exports.generar= ()=>{
    const randomToken = crypto.randomBytes(4).toString("hex").toString();
    return randomToken;
 }

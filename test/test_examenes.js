let expect = require('chai').expect;
let services = require("../apiServices/services/examenesServ")
console.log("first");

describe('Testing a Sevicios de Examenes', function () {
    
    it('Dado un token gernerar un examen random con 10 respuestas ', async function() {
        const token = "test"
        const preg = await services.generarExamen(token)
        
        expect(preg.length).to.equal(10);

    })
    it('Dado un token validar la existencia de un examen ', async function() {
        const token = "test"
        const existe = await services.examenExist(token)
        
        expect(existe).to.equal(true);

    })

})
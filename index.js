
const express = require("express");
const { ObjectId } = require("mongodb");
const routesUs = require("./apiServices/routes/usuarios");
const routesEx = require("./apiServices/routes/examenes");

require("./apiServices/dbconnection/mongoConection");  //Conexión con BD


const app = express();
const http = require("http").createServer(app);
const PORT = 4200;

app.use(express.json());
app.use(routesUs);   // Rutas API
app.use(routesEx);   // Rutas API

http.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
})

console.log("owo");


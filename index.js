const express = require('express');
const path = require("path");
const rutas = require('./routers/rutas');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
app.set('view engine', 'ejs');
app.use("/", express.static(path.join(__dirname,"/web")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', rutas);


const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Sitio en http://localhost:"+port);
});
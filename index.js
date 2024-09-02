const express = require('express');
const app = express();


app.get('/', (req, res) => res.send('Hello World!'));

const medicoController = require("./controladores/medicoController.js");
app.use("/api/medico", medicoController);


const pacienteController = require("./controladores/pacienteController.js");
app.use("/api/paciente", pacienteController);

app.listen(8080, () => console.log(`Example app listening on port 8080!`));

module.exports = app; 
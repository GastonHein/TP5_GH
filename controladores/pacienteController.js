//--- requires ------------------------------------------
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const pacienteBD = require("./../modelos/pacienteModel.js");

// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para MEDICO --- 
// --------------------------------------------------------

app.get("/", listarTodo);
app.get("/:nss", getBynss);
app.get('/:nss', obtenerPaciente);
app.post('/create', crear);
app.put("/:nss", modificarPaciente);
app.delete("/:nss", eliminarPaciente);


// --------------------------------------------------------
// ---------FUNCIONES UTILIZADAS EN ENDPOINTS -------------
// --------------------------------------------------------

function listarTodo(req, res) {
    pacienteBD.metodos.getAll((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function getBynss(req, res) {
    nss = req.params.nss;
   pacienteBD.metodos.getBynss((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function crear(req, res) {
    pacienteBD.metodos.crearPaciente(req.body, (err, exito) => {
        if (err) {
            res.send(err);
        } else {
            res.json(exito);
        }
    });
}


function obtenerPaciente(req, res) {
    nss = req.params.nss;
    pacienteBD.metodos.getPaciente(nss, () => {
        (err, exito) => {
            if (err) {
                res.status(500).send({ message: "No se encontró un paciente con el Numero: " + nss});
            } else {
                res.status(200).json(exito);
            }
        }
    });
}

app.put("/:nss", modificarPaciente);



function modificarPaciente(req, res) {
    let datosPaciente = req.body;
    let nro_historial_clinico = req.params.nro_historial_clinico;
    pacienteBD.metodos.update(datosPaciente, nro_historial_clinico, (err, exito) => {
        if (err) {
            res.status(500).send(err)
        } else if (exito.affectedRows === 0) {
            res.status(404).json({ message: "No se encontró un paciente con el Numero de Historial Clinico: " + nro_historial_clinico });
        } else {
            res.status(200).send(exito) 
        }
    });
}


function eliminarPaciente(req, res) {
    nss = req.params.nss;
    pacienteBD.metodos.deletePaciente(req.params.nss, (err, exito) => {
        if (err) {
            res.status(500).json(err);
        } else if (exito.affectedRows === 0) {
            res.status(404).json({ message: "No se encontró un paciente con el Numero: " + nss });
        } else {
            res.send(exito)
        }
    })
}

//exportamos app que es nuestro servidor express a la cual se le agregaron endpoinds de escucha
module.exports = app;
require('rootpath')();

const mysql = require("mysql");
const configuracion = require("config.json");
const { query } = require('express');


const connection = mysql.createConnection(configuracion.database);

connection.connect((err) => {
    if (err) {
        console.log(err.code);
    } else {
        console.log("BD conectada");
    }
});

var metodos = {}

app.get("/", listarTodo()); 
pacientes = pacienteBD.getAll((err, result) => {});

metodos.getAll = function (callback) {
    const consulta = "select * from paciente";
    connection.query(consulta, function (err, resultados, fields) {
        if (err) {
            callback(err);
            return;
        } else {
            callback(undefined, {
                messaje: "Resultados de la consulta",
                detail: resultados,
            });
        }
    });
}

app.get('/:id', obtenerPaciente); 
pacienteBD.getPaciente(id, () => {});

metodos.getPaciente = function (id, callback) {
    const consulta = "select * from paciente where nss = ?";

    connection.query(consulta, nss, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "No se encontró un paciente con el Numero: " + nss);
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta",
                    detail: resultados,
                });
            }
        }
    });
}

metodos.getByNSS = function (nro_historial_clinico, callback) {
    consulta = "select * from paciente where nro_historial_clinico = ?";

    connection.query(consulta, nro_historial_clinico, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un paciente con ese numero:" + nro_historial_clinico)
            } else {
                callback(undefined, {
                    messaje: "El número es: " + nro_historial_clinico,
                    detail: resultados,
                });
            }
        }

    });

}

app.put("/:id", modificarPaciente);  
function modificarPaciente(req, res) {};

metodos.update = function (datosPaciente, idPaciente, callback) {

    const datos = [
        datosPaciente.nro_historial_clinico,
        datosPaciente.nombre,
        datosPaciente.apellido,
        datosPaciente.domicilio,
        datosPaciente.codigo_postal,
        datosPaciente.telefono,
        datosPaciente.nro_hisotorial_clinico,
        datosPaciente.observaciones,
        parseInt(paciente)
    ];

    const consulta = "update paciente set nss = ?, nombre = ?, apellido = ?, edad = ?, direccion = ? WHERE id = ?";

    connection.query(consulta, datos, (err, rows) => {
        if (err) {
            callback(err);
        } else {
            if (rows.affectedRows == 0) {
                callback(undefined, {
                    message: `No se encontró un paciente con el numero: ${paciente}`,
                    detail: rows,
                });
            } else {
                callback(undefined, {
                    message: `El paciente ${datosPaciente.nombre} se actualizó correctamente`,
                    detail: rows,
                });
            }
        }
    });
}

pacienteBD.metodos.crearPaciente(req.body, (err, exito) => {});
metodos.crearPaciente = function (datosPaciente, callback) {
    const paciente = [
        datosPaciente.nss,
        datosPaciente.nombre,
        datosPaciente.apellido,
        datosPaciente.domicilio,
        datosPaciente.codigo_postal,
        datosPaciente.telefono,
        datosPaciente.nro_hisotorial_clinico,
        datosPaciente.observaciones,
    ];

    const consulta = "update paciente set nss = ?, nombre = ?, apellido = ?, domicilio = ?, codigo_postal = ?, telefono = ?, nro_ historial_clinico = ?, observaciones = ?";

    connection.query(consulta, paciente, (err, rows) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                callback({
                    message: "Ya existe un paciente con el numero " + datosPaciente.nss,
                    detail: err.sqlMessage
                });
            } else {
                callback({
                    message: "Otro error que no conocemos",
                    detail: err.sqlMessage
                });
            }
        } else {
            callback(undefined, {
                message: "El paciente " + datosPaciente.nombre + " " + datosPaciente.apellido + " se registró correctamente",
                detail: rows,
            });
        }
    });
}

app.delete("/:nss", eliminarPaciente);     
pacienteBD.metodos.deletePaciente(req.params.id, (err, exito) => {}); 

metodos.deletePaciente = function (nss, callback) {
    const query = "delete from paciente where nss = ?";
    connection.query(query, nss, function (err, rows, fields) {
        if (err) {
            callback({
                message: "Ha ocurrido un error",
                detail: err.sqlMessage,
            });
        }

        if (rows.affectedRows == 0) {
            callback(undefined, "No se encontró un paciente con el numero " + nss);
        } else {
            callback(undefined, "El paciente " + nss + " fue eliminado de la base de datos");
        }
    });
}

module.exports = { metodos }

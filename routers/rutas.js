const express = require('express');
const sql = require("../bd/sql");

const ruta = express.Router();

ruta.get('/', async (req, res) => {
    try {
        const result = await sql.mostrarBasesDeDatos();
        res.render('bases', { databases: result, error: null });
    } catch (error) {
        console.error("Error al mostrar las bases de datos:", error);
        res.render('bases', { databases: [], error: 'Error al mostrar las bases de datos' });
    }
});

ruta.post('/crear', async (req, res) => {
    let nombreBD = req.body.nombreBD;
    try {
        await sql.crearBaseDeDatos(nombreBD);
        res.redirect('/');
    } catch (error) {
        console.error("Error al crear la base de datos:", error);
        res.redirect('/');
    }
});

ruta.post('/editarBD', async (req, res) => {
    let nBD = req.body.nBD;
    try {
        const tables = await sql.mostrarTablas(nBD);
        res.render('editar', { nBD, tables, error: null });
    } catch (error) {
        console.error("Error al mostrar las tablas:", error);
        res.render('editar', { nBD, tables: [], error: 'Error al mostrar las tablas' });
    }
});

ruta.get('/editar/:nBD', async (req, res) => {
    let nBD = req.params.nBD;
    try {
        const tables = await sql.mostrarTablas(nBD);
        res.render('editar', { nBD, tables, error: null });
    } catch (error) {
        console.error("Error al mostrar las tablas:", error);
        res.render('editar', { nBD, tables: [], error: 'Error al mostrar las tablas' });
    }
});

ruta.post('/eliminarBD', async (req, res) => {
    let nBD = req.body.nBD;
    try {
        await sql.eliminarBaseDeDatos(nBD);
        res.redirect('/');
    } catch (error) {
        console.error("Error al eliminar la base de datos:", error);
        res.redirect('/');
    }
});

ruta.post('/crearTabla', async (req, res) => {
    let nBD = req.body.nBD;
    let ntabla = req.body.ntabla;
    let columns = req.body.columns;
    try {
        await sql.crearTabla(nBD, ntabla, columns);
        const tables = await sql.mostrarTablas(nBD);
        res.render('editar', { nBD, tables, error: null });
    } catch (error) {
        console.error("Error al crear la tabla:", error);

        try {
            const tables = await sql.mostrarTablas(nBD);
            res.render('editar', { nBD, tables, error: 'Error al crear la tabla' });
        } catch (innerError) {
            console.error("Error al recuperar las tablas:", innerError);
            res.render('editar', { nBD, tables: [], error: 'Error al crear la tabla y al recuperar las tablas' });
        }
    }
});

ruta.post('/eliminarTB', async (req, res) => {
    let nBD = req.body.nBD;
    let nTB = req.body.nTB;
    try {
        await sql.eliminarTabla(nBD, nTB);
        const tables = await sql.mostrarTablas(nBD);
        res.render('editar', { nBD, tables, error: null });
    } catch (error) {
        console.error("Error al borrar la tabla:", error);
        res.render('editar', { nBD, tables: [], error: 'Error al borrar la tabla' });
    }
});

ruta.post('/actualizarTabla', async (req, res) => {
    let nBD = req.body.nBD;
    let nTB = req.body.nTB;
    let columns = req.body.columns;

    console.log("Datos recibidos:", nBD, nTB, columns);

    try {
        await sql.actualizarTabla(nBD, nTB, columns);
        const tables = await sql.mostrarTablas(nBD);
        res.render('editar', { nBD, tables, error: null });
    } catch (error) {
        console.error("Error al actualizar la tabla:", error);
        res.render('editar', { nBD, tables: [], error: 'Error al actualizar la tabla' });
    }
});

ruta.post('/editarTB', async (req, res) => {
    let nBD = req.body.nBD;
    let nTB = req.body.nTB;
    try {
        const columnas = await sql.obtenerColumnas(nBD, nTB);
        res.render('editarTabla', { nBD, nTB, columns: columnas, error: null });
    } catch (error) {
        console.error("Error al cargar los detalles de la tabla:", error);
        res.render('editar', { nBD, tables: [], error: 'Error al cargar los detalles de la tabla' });
    }
});

ruta.post('/insersionTB', async (req, res) => {
    let nBD = req.body.nBD;
    let nTB = req.body.nTB;
    try {
        const columnas = await sql.obtenerColumnas(nBD, nTB);
        const filas = await sql.ObtenerFilas(nBD, nTB);
        res.render('TablaMostrar', { nBD, nTB, columns: columnas, rows: filas, error: null });
    } catch (error) {
        console.error("Error al cargar los detalles de la tabla:", error);
        res.render('TablaMostrar', { nBD, nTB, columns: [], rows: [], error: 'Error al cargar los detalles de la tabla' });
    }
});

ruta.get('/insertarFila/:nBD/:nTB', async (req, res) => {
    let nBD = req.params.nBD;
    let nTB = req.params.nTB;
    try {
        const columnas = await sql.obtenerColumnas(nBD, nTB);
        const filas = await sql.ObtenerFilas(nBD, nTB);
        res.render('TablaInsertar', { nBD, nTB, columns: columnas, rows: filas, error: null });
    } catch (error) {
        console.error("Error al cargar los detalles de la tabla:", error);
        res.render('TablaInsertar', { nBD, nTB, columns: [], error: 'Error al cargar los detalles de la tabla' });
    }
});

ruta.post('/insertarFila', async (req, res) => {
    let nBD = req.body.nBD;
    let nTB = req.body.nTB;
    let columnas = req.body.columns;

    try {
        await sql.insertarFila(nBD, nTB, columnas);
        const columnasActualizadas = await sql.obtenerColumnas(nBD, nTB);
        const filasActualizadas = await sql.ObtenerFilas(nBD, nTB);
        res.render('TablaMostrar', { nBD, nTB, columns: columnasActualizadas, rows: filasActualizadas, error: null });
    } catch (error) {
        console.error("Error al insertar la fila:", error);
        res.render('TablaMostrar', { nBD, nTB, columns: [], rows: [], error: 'Error al cargar los detalles de la tabla' });
    }
});

ruta.get('/modificarFila/:nBD/:nTB/:id', async (req, res) => {
    let nBD = req.params.nBD;
    let nTB = req.params.nTB;
    let id = req.params.id;
    console.log(`nBD: ${nBD}, nTB: ${nTB}, id: ${id}`);

    try {
        const fila = await sql.obtenerFilaPorId(nBD, nTB, id, 'primary_key');
        const columnas = await sql.obtenerColumnas(nBD, nTB);
        res.render('TablaModificar', { nBD, nTB, fila, columns: columnas, error: null });
    } catch (error) {
        console.error("Error al cargar los detalles de la fila:", error);
        res.render('TablaModificar', { nBD, nTB, fila: null, columns: [], error: 'Error al cargar los detalles de la fila' });
    }
});

ruta.post('/modificarFila', async (req, res) => {
    const nBD = req.body.nBD;
    const nTB = req.body.nTB;
    const id = req.body.id;
    const actualizaciones = req.body.columns;

    try {
        await sql.actualizarFila(nBD, nTB, id, actualizaciones);
        const columnasActualizadas = await sql.obtenerColumnas(nBD, nTB);
        const filasActualizadas = await sql.ObtenerFilas(nBD, nTB);
        res.render('TablaMostrar', { nBD, nTB, columns: columnasActualizadas, rows: filasActualizadas, error: null });
    } catch (error) {
        console.error("Error al modificar el registro:", error);
        res.render('TablaMostrar', { nBD, nTB, columns: [], rows: [], error: 'Error al modificar el registro' });
    }
});

ruta.post('/eliminarFila', async (req, res) => {
    let nBD = req.body.nBD;
    let nTB = req.body.nTB;
    let id = req.body.id;
    try {
        await sql.eliminarFila(nBD, nTB, id);
        const filas = await sql.ObtenerFilas(nBD, nTB);
        const columnas = await sql.obtenerColumnas(nBD, nTB);
        res.render('TablaMostrar', { nBD, nTB, columns: columnas, rows: filas, error: null });
    } catch (error) {
        console.error("Error al eliminar la fila:", error);
        res.render('TablaMostrar', { nBD, nTB, columns: [], rows: [], error: 'Error al eliminar la fila' });
    }
});

module.exports = ruta;

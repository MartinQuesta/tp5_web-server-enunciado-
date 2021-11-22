import express from 'express'


//flag
let ultimoId = 0

//Contructor ID
function crearId() {
    const nuevoId = ultimoId + 1
    ultimoId = nuevoId
    return nuevoId
}

function crearServidor() {

    const app = express()

    app.use(express.json())

    const alumnos = []

    app.get('/', (req, res) => {
        res.json({ msg: 'hola mundo' })
    })


    app.post('/alumnos', (req, res) => {
        // console.log(req.body)
        const alumno = { ...req.body, id: crearId() }
        alumnos.push(alumno)
        res.json(alumno)
    })
//
    app.get('/alumnos', (req, res) => {

        // console.log(req.query)

        if (req.query.nombre) {
            // const result = alumnos.filter(p => p.nombre === req.query.nombre)
            const result = alumnos.filter(p => p.nombre.startsWith(req.query.nombre))
            res.json(result)
        } else {
            res.json(alumnos)
        }
    })

    app.get('/alumnos/:idAlumno', (req, res) => {
        // console.log(req.params)
        const { idAlumno } = req.params

        // const idNumerico = parseInt(idAlumno)

        const alumno = alumnos.find(p => p.id == idNumerico)

        if (alumno) {
            res.json(alumno)
        } else {
            res.status(404)
            res.json({
                msg: `alumno con id ${idNumerico} no encontrado`
            })
        }
    })

    app.put('/alumnos/:idAlumno', (req, res) => {
        const alumno = { ...req.body }

        // validar que es una alumno completa y valida

        const indexAlumno = alumnos.findIndex(p => p.id == idNumerico)

        alumnos[ indexAlumno ] = alumno

        if (indexAlumno != -1) {
            res.json()
        } else {
            res.status(404)
            res.json({
                msg: `alumno con id ${idNumerico} no encontrado`
            })
        }
    })

    app.patch('/alumnos/:idAlumno', (req, res) => {
        const campos = { ...req.body }

        const indexAlumno = alumnos.findIndex(p => p.id == idNumerico)

        alumnos[ indexAlumno ] = { ...alumnos[ indexAlumno ], ...campos }

        if (indexAlumno != -1) {
            res.json()
        } else {
            res.status(404)
            res.json({
                msg: `alumno con id ${idNumerico} no encontrado`
            })
        }
    })

    let server

    return {
        conectar: (puerto = 0) => {
            return new Promise((resolve, reject) => {
                server = app.listen(puerto)
                server.on('request', request => { console.log(`${new Date().toLocaleString()}: ${request.method} ${request.url}`) })
                server.on('listening', () => { resolve(server) })
                server.on('error', error => { reject() })
            })
        },
        desconectar: () => {
            return new Promise((resolve, reject) => {
                server.close(error => {
                    if (error) reject(error)
                    else resolve()
                })
            })
        }
    }
}

export { crearServidor }
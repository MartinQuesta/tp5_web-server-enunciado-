import ClienteHTTP from './clienteHTTP/cliente.js'
import { crearServidor } from './server.js'

const servidor = crearServidor()

const conexion = await servidor.conectar()

const cliente = new ClienteHTTP(`http://localhost:${conexion.address().port}/alumnos`)

console.log(await cliente.agregar({ nombre: 'julieta', apellido: 'Lodriguez', dni: 12346, edad: 24 }))
console.log(await cliente.agregar({ nombre: 'julieto', apellido: 'Rodriguez', dni: 12347, edad: 26 }))
console.log(await cliente.agregar({ nombre: 'juliete', apellido: 'Fordriguez', dni: 12348, edad: 29 }))


const alumnos = await cliente.obtener({ nombre: 'julieta' })

console.log(alumnos)

await servidor.desconectar()

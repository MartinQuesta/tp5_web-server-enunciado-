import axios from 'axios'

//constructor cliente
class ClienteHTTP {
    constructor(url) {
        this.url = url
    }
//Create
    async agregar(recurso) {
        try {
            // console.log(recurso)
            const respuesta = await axios.post(this.url, recurso)
            return respuesta.data
        } catch (error) {
            throw error.response
        }
    }
//Read
    async obtener(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = `${this.url}${queryString ? '?' + queryString : ''}`

        try {
            const respuesta = await axios.get(url)
            return respuesta.data;
        } catch (error) {
            throw error.response
        }
    }
//DELETE
    async borrar(id) {

            try {
                const respuesta = await axios.delete(`${this.url}/${id}`)
                return respuesta.data
            } catch (error) {
                throw error.response
            }
    }
}

export default ClienteHTTP

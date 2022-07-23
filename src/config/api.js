import axios from 'axios'

const api = axios.create({
    baseURL: "https://secondhand-2-binar-final.herokuapp.com",
})

export default api
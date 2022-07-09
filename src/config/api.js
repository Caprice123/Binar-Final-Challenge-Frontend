import axios from 'axios'

const api = axios.create({
    // baseURL: "http://localhost:8000",
    baseURL: "https://secondhand-2-binar-final.herokuapp.com/",
})

export default api
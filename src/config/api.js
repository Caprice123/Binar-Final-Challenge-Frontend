import axios from 'axios'

const api = axios.create({
    baseURL: "https://backend-2-binar-final-ch.herokuapp.com/"
})

export default api
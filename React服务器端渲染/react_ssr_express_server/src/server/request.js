import axios from 'axios'

export const createInstance = (req) => {
    return axios.create({
        baseURL: 'http://localhost:5000/ssr/',
        headers: {
            Authorization: req.get("Authorization") || '',
        },
    })
}

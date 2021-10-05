import axios from "axios";
import * as actionTypes from './actionTypes'

export const initData = (server) => {
    let url = ''
    if (server) {
        url = 'http://localhost:5000/ssr/api/books'
    } else {
        url = '/api/books'
    }

    return (dispatch) => {
        return axios.get(url)
            .then((res) => {
                dispatch(initDataAction(res.data))
            })
            .catch((error) => {
                console.log(error)
            });
    };
};

const initDataAction = (data) => ({
    type: actionTypes.INIT_DATA_ACTION,
    data: data
})

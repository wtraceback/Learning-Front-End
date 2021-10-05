import axios from "axios";
import * as actionTypes from './actionTypes'

export const initData = () => {
    return (dispatch) => {
        return axios.get("http://localhost:5000/ssr/api/books")
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

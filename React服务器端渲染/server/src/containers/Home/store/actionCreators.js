import { instance as clientAxios } from '../../../client/request'
import { instance as serverAxios } from '../../../server/request'
import * as actionTypes from './actionTypes'

export const initData = (server) => {
    let request = server ? serverAxios : clientAxios

    return (dispatch) => {
        return request.get('/api/books')
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

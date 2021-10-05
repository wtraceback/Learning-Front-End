import * as actionTypes from './actionTypes'

export const initData = () => {
    return (dispatch, getState, axiosInstance) => {
        return axiosInstance.get('/api/books')
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

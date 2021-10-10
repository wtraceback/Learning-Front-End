import * as actionTypes from './actionTypes'

export const initData = () => {
    return (dispatch, getState, axiosInstance) => {
        return axiosInstance.get('/api/book_title')
            .then((res) => {
                if (res.data.success) {
                    dispatch(initDataAction(res.data.data))
                }
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

import * as actionTypes from './actionTypes'

export const initBookData = () => {
    return (dispatch, getState, axiosInstance) => {
        return axiosInstance.get('/api/book_info')
            .then((res) => {
                if (res.data.success) {
                    dispatch(initBookDataAction(res.data.data))
                } else {
                    dispatch(initBookDataAction([]))
                }
            })
            .catch((error) => {
                console.log(error)
            });
    };
};

const initBookDataAction = (data) => ({
    type: actionTypes.INIT_BOOK_DATA,
    data: data
})

import * as actionTypes from './actionTypes'

export const getHeaderInfo = () => {
    return (dispatch, getState, axiosInstance) => {
        return axiosInstance.get('/api/isLogin')
            .then((res) => {
                console.log(res.data);
                if (res.data.success === true) {
                    dispatch(getHeaderInfoAction(res.data.data.login))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

const getHeaderInfoAction = (login) => ({
    type: actionTypes.INIT_HEADER_INFO,
    login: login,
})
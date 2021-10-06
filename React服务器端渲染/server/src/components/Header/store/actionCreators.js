import * as actionTypes from './actionTypes'

export const getHeaderInfo = () => {
    return (dispatch, getState, axiosInstance) => {
        return axiosInstance.get('/api/isLogin')
            .then((res) => {
                console.log(res.data);
                if (res.data.success === true) {
                    dispatch(changeLoginStatus(res.data.data.login))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

const changeLoginStatus = (login) => ({
    type: actionTypes.CHANGE_LOGIN_STATUS,
    login: login,
})

export const handleLogin = () => {
    return (dispatch, getState, axiosInstance) => {
        axiosInstance.get('/api/login')
            .then((res) => {
                if (res.data.success) {
                    dispatch(changeLoginStatus(true))
                }
            })
    }
}

export const handleLogout = () => {
    return (dispatch, getState, axiosInstance) => {
        axiosInstance.get('/api/logout')
            .then((res) => {
                if (res.data.success) {
                    dispatch(changeLoginStatus(false))
                }
            })
    }
}
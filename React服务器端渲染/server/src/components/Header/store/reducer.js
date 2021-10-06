import * as actionTypes from './actionTypes'

const defaultState = {
    login: false,
}

const reducer = (state=defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_LOGIN_STATUS:
            const newState = {
                ...state,
                login: action.login
            }
            return newState
        default:
            return state
    }
}

export default reducer
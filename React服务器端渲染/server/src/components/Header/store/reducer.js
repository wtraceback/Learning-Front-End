import * as actionTypes from './actionTypes'

const defaultState = {
    login: false,
}

const reducer = (state=defaultState, action) => {
    switch(action.type) {
        case actionTypes.INIT_HEADER_INFO:
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
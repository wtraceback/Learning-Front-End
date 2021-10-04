import * as actionTypes from './actionTypes'

const defaultState = {
    name: "hello world2",
    data: [],
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.INIT_DATA_ACTION:
            const newState = {
                // 展开旧的数据
                ...state,
                // 覆盖旧的数据
                data: action.data,
            }

            return newState
        default:
            return state;
    }
};

export default reducer;

import * as actionTypes from './actionTypes'

const defaultState = {
    book_data: [],
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.INIT_BOOK_DATA:
            const newState = {
                // 展开旧的数据
                ...state,
                // 覆盖旧的数据
                book_data: action.data,
            }

            return newState
        default:
            return state;
    }
};

export default reducer;

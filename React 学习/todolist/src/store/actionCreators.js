import axios from 'axios'

import {
    CHANGE_INPUT_VALUE,
    ADD_TODO_ITEM,
    DELETE_TODO_ITEM,
    INIT_TODO_LIST,
} from './actionTypes'

export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value: value,
})

export const getAddItemAction = () => ({
    type: ADD_TODO_ITEM,
})

export const getDeleteItemAction = (index) => ({
    type: DELETE_TODO_ITEM,
    index: index,
})

export const initTodoListAction = (data) => ({
    type: INIT_TODO_LIST,
    data: data,
})

export const getTodoList = () => {
    // 添加了 react-thunk 后，store.dispatch 可以接收函数并自动调用函数
    // 调用函数的时候，会自动的传入一个参数：dispatch
    return (dispatch) => {
        axios.get('/api/todolist')
            .then((res) => {
                const action = initTodoListAction(res.data)
                dispatch(action)
            })
            .catch((error) => {
                console.log('数据请求失败');
                console.log(error);
            })
    }
}
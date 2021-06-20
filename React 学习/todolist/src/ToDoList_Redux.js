import React from 'react'

import store from './store/index'
import {
    getInputChangeAction,
    getAddItemAction,
    getDeleteItemAction,
    getTodoList,
} from './store/actionCreators'
import ToDoListUI from './ToDoList_Redux_UI'

class ToDoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = store.getState()

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleStoreChange = this.handleStoreChange.bind(this)

        store.subscribe(this.handleStoreChange)
    }

    render() {
        return (
            <ToDoListUI 
                inputValue={this.state.inputValue}
                list={this.state.list}
                handleSubmit={this.handleSubmit}
                handleInputChange={this.handleInputChange}
                handleDelete={this.handleDelete}
            />
        )
    }

    handleInputChange(e) {
        const action = getInputChangeAction(e.target.value)
        store.dispatch(action);
    }

    handleSubmit() {
        const action = getAddItemAction()
        store.dispatch(action)
    }

    handleDelete(index) {
        const action = getDeleteItemAction(index)
        store.dispatch(action)
    }

    handleStoreChange() {
        this.setState(store.getState())
    }

    componentDidMount() {
        const action = getTodoList()
        // 原本 store.dispatch 只接收 js 对象，也就是 action 只能为 js 对象
        // 但是添加了 react-thunk 中间件之后，可以接收函数，然后会自动调用函数
        store.dispatch(action)
        // axios.get('/api/todolist')
        //     .then((res) => {
        //         const action = initTodoListAction(res.data)
        //         store.dispatch(action)
        //     })
        //     .catch((error) => {
        //         console.log('数据请求失败');
        //         console.log(error);
        //     })
    }
}

export default ToDoList
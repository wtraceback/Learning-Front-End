import React from 'react'
import store from './store/index'

import {
    getInputChangeAction,
    getAddItemAction,
    getDeleteItemAction,
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
}

export default ToDoList
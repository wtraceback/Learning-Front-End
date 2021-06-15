import React from 'react'
import store from './store/index'
import {
    CHANGE_INPUT_VALUE,
    ADD_TODO_ITEM,
    DELETE_TODO_ITEM,
} from './store/actionTypes'

class ToDoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = store.getState()

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleStoreChange = this.handleStoreChange.bind(this)

        store.subscribe(this.handleStoreChange)
    }

    handleSubmit() {
        const action = {
            type: ADD_TODO_ITEM,
        }

        store.dispatch(action)
    }

    handleInputChange(e) {
        const action = {
            type: CHANGE_INPUT_VALUE,
            value: e.target.value,
        }

        store.dispatch(action);
    }

    handleDelete(index) {
        const action = {
            type: DELETE_TODO_ITEM,
            index: index,
        }

        store.dispatch(action)
    }

    handleStoreChange() {
        this.setState(store.getState())
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <input value={this.state.inputValue} onChange={this.handleInputChange} />
                    <button onClick={this.handleSubmit}>提交</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <li key={index} onClick={this.handleDelete.bind(this, index)}>{item}</li>
                            )
                        })
                    }
                </ul>
            </React.Fragment>
        )
    }
}

export default ToDoList
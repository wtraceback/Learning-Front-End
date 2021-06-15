import React from 'react'
import store from './store/index'
import {
    getInputChangeAction,
    getAddItemAction,
    getDeleteItemAction,
} from './store/actionCreators'

class ToDoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = store.getState()

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleStoreChange = this.handleStoreChange.bind(this)

        store.subscribe(this.handleStoreChange)
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
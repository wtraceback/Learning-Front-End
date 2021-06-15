import React from 'react'
import store from './store/index'

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
            type: 'add_todo_item',
        }

        store.dispatch(action)
    }

    handleInputChange(e) {
        const action = {
            type: 'change_input_value',
            value: e.target.value,
        }

        store.dispatch(action);
    }

    handleDelete(index) {
        const list = [...this.state.list]
        list.splice(index, 1)
        this.setState({
            list: list,
        })
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
import React from 'react'
import store from './store/index'

class ToDoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = store.getState()

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleSubmit() {
        const list = [...this.state.list]
        list.push(this.state.inputValue)
        this.setState({
            list: list,
            inputValue: '',
        })
    }

    handleInputChange(e) {
        this.setState({
          inputValue: e.target.value,
        })
    }

    handleDelete(index) {
        const list = [...this.state.list]
        list.splice(index, 1)
        this.setState({
            list: list,
        })
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
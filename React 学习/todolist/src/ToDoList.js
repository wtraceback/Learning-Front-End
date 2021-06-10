import React from 'react'
import ToDoItem from './ToDoItem'

class ToDoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            inputValue: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleSubmit() {
        this.setState({
            list: [...this.state.list, this.state.inputValue],
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

    getToDoItems() {
        return (
            this.state.list.map((item, index) => {
                return (
                    <ToDoItem
                        delete={this.handleDelete}
                        key={index}
                        content={item}
                        index={index}
                    />
                )
            })
        )
    }

    render() {
        return (
          <div>
              <div>
                <input value={this.state.inputValue} onChange={this.handleInputChange} />
                <button onClick={this.handleSubmit}>添加</button>
              </div>
              <ul>
                {this.getToDoItems()}
              </ul>
          </div>
        );
    }
}

export default ToDoList;

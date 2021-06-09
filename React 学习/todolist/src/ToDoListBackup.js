import React from 'react'

class ToDoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            inputValue: '',
        }
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

    render() {
        return (
          <div>
              <div>
                <input value={ this.state.inputValue } onChange={ this.handleInputChange.bind(this) } />
                <button onClick={ this.handleSubmit.bind(this) }>添加</button>
              </div>
              <ul>
                {
                    this.state.list.map((item, index) => {
                        return <li key={ index } onClick={ this.handleDelete.bind(this, index) }>{ item }</li>
                    })
                }
              </ul>
          </div>
        );
    }
}

export default ToDoList;

import React from 'react'

class ToDoItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete() {
        this.props.delete(this.props.index)
    }

    render() {
        return (
            <li onClick={this.handleDelete}>{this.props.content}</li>
        )
    }
}

export default ToDoItem

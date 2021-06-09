import React from 'react'

class ToDoItem extends React.Component {
    handleDelete() {
        this.props.delete(this.props.index)
    }

    render() {
        return (
            <li onClick={this.handleDelete.bind(this)}>{this.props.content}</li>
        )
    }
}

export default ToDoItem

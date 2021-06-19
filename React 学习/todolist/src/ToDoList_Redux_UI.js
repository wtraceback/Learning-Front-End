import React from 'react'

class ToDoListUI extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <input value={this.props.inputValue} onChange={this.props.handleInputChange} />
                    <button onClick={this.props.handleSubmit}>提交</button>
                </div>
                <ul>
                    {
                        this.props.list.map((item, index) => {
                            return (
                                <li key={index} onClick={() => {this.props.handleDelete(index)}}>{item}</li>
                            )
                        })
                    }
                </ul>
            </React.Fragment>
        )
    }
}

export default ToDoListUI
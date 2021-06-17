import React from 'react'
import { connect } from 'react-redux'

class App extends React.Component {
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
                <li key={index} onClick={this.props.handleDelete}>{item}</li>
              )
            })
          }
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange(e) {
      const action = {
        type: 'change_input_value',
        value: e.target.value,
      }
      dispatch(action)
    },
    handleSubmit() {
      const action = {
        type: 'add_todo_item',
      }
      dispatch(action)
    },
    handleDelete(index) {
      console.log(index);
      // const action = {
      //   type: 'delete_todo_item',
      //   index: index,
      // }
      // dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

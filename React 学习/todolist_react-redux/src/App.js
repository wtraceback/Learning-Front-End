import React from 'react'
import { connect } from 'react-redux'
import { 
  getInputChangeAction, 
  getAddItemAction, 
  getDeleteItemAction,
} from './store/actionCreators'

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
                <li key={index} onClick={() => this.props.handleDelete(index)}>{item}</li>
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
      const action = getInputChangeAction(e.target.value)
      dispatch(action)
    },
    handleSubmit() {
      const action = getAddItemAction()
      dispatch(action)
    },
    handleDelete(index) {
      const action = getDeleteItemAction(index)
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

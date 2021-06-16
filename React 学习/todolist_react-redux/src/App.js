import React from 'react'
import store from './store/index'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <input value={this.state.inputValue} />
          <button>提交</button>
        </div>
        <ul>
          {
            this.state.list.map((item, index) => {
              return (
                <li key={index}>{item}</li>
              )
            })
          }
        </ul>
      </React.Fragment>
    );
  }
}

export default App;

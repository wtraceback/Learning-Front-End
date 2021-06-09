import React from 'react'

class ToDoList extends React.Component {
    render() {
        return (
          <div>
              <div>
                <input type="text" />
                <button>添加</button>
              </div>
              <ul>
                <li>a</li>
                <li>b</li>
              </ul>
          </div>
        );
    }
}

export default ToDoList;

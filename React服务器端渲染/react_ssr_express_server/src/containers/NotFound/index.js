import React, { Component } from 'react'

class NotFound extends Component {
    render() {
        // 服务器端渲染时，给 context 赋值
        if (this.props.staticContext !== undefined) {
            this.props.staticContext.NOT_FOUND = true
        }

        return (
            <div>
                404, Page Not Found
            </div>
        )
    }
}

export default NotFound
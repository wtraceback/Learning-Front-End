import React, { Component } from "react";

// 类工厂（生成高阶组件的函数）：接收组件为参数，再返回组件
export default (DecoratedComponent, styles) => {
    // 返回的这个组件叫高阶组件
    return class NewComponent extends Component {
        render() {
            // 服务器端渲染时，给 context 赋值
            if (this.props.staticContext !== undefined) {
                this.props.staticContext.css.push(styles._getCss())
            }

            return <DecoratedComponent {...this.props} />
        }
    }
}
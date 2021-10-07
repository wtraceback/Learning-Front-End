import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { actionCreators } from './store'
import styles from './index.module.css'

class Header extends Component {
    render() {
        // 服务器端渲染时，给 context 赋值
        if (this.props.staticContext !== undefined) {
            this.props.staticContext.css.push(styles._getCss())
        }

        return (
            <div className={styles.main}>
                <Link to="/">Home</Link>
                <br />
                {
                    this.props.login ? (
                        <Fragment>
                            <Link to="/book">书籍信息</Link>
                            <br />
                            <Link to="/logout" onClick={(e) => {e.preventDefault(); this.props.handleLogout() }}>
                                Logout
                            </Link>
                        </Fragment>
                    ) : (
                        <Link to="/login" onClick={(e) => {e.preventDefault(); this.props.handleLogin() }}>
                            Login
                        </Link>
                    )
                }
            </div>
        );
    }
};

Header.loadData = (store) => {
    return store.dispatch(actionCreators.getHeaderInfo())
}

const mapStateToProps = (state) => {
    return {
        login: state.header.login,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin() {
            dispatch(actionCreators.handleLogin())
        },
        handleLogout() {
            dispatch(actionCreators.handleLogout())
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
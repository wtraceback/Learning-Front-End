import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { actionCreators } from './store'

class Header extends Component {
    render() {
        return (
            <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
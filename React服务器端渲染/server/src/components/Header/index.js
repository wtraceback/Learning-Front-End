import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { actionCreators } from './store'
import styles from './index.module.css'
import withStyle from "../../withStyle";

class Header extends Component {
    render() {
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

const ExportHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyle(Header, styles)));

ExportHeader.loadData = (store) => {
    return store.dispatch(actionCreators.getHeaderInfo())
}

export default ExportHeader
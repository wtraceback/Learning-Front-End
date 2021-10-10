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
                <Link to="/" className={styles.item}>Home</Link>
                {
                    this.props.login ? (
                        <Fragment>
                            <Link
                                to="/book"
                                className={styles.item}
                            >
                                书籍信息
                            </Link>
                            <button
                                to="/logout"
                                className={styles.item_butn}
                                onClick={this.props.handleLogout}
                            >
                                Logout
                            </button>
                        </Fragment>
                    ) : (
                        <button
                            to="/login"
                            className={styles.item_butn}
                            onClick={this.props.handleLogin}
                        >
                            Login
                        </button>
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
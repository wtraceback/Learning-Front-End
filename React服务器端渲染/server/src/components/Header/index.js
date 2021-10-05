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
                            <Link to="/translate">翻译列表</Link>
                            <br />
                            <Link to="/logout">Logout</Link>
                        </Fragment>
                    ) : (
                        <Link to="/login">Login</Link>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
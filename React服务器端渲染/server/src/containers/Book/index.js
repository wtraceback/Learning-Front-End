import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router'
import Header from "../../components/Header";
import { actionCreators } from "./store";

class Book extends Component {
    render() {
        if (this.props.login) {
            return (
                <div>
                    <Header />
                    <div>book Page</div>
                    {
                        this.props.book_data.map((item) => {
                            return (
                                <div key={item.id}>
                                    <span>{item.title}</span>&nbsp;
                                    <span>{item.author}</span>&nbsp;
                                    <span>{item.price}</span>
                                </div>
                            )
                        })
                    }
                </div>
            );
        } else {
            return <Redirect to="/" />
        }
    }

    componentDidMount() {
        if (this.props.book_data.length === 0) {
            this.props.initBookData();
        }
    }
};

Book.loadData = (store) => {
    return store.dispatch(actionCreators.initBookData())
}

const mapStateToProps = (state) => {
    return {
        book_data: state.book.book_data,
        login: state.header.login,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initBookData() {
            dispatch(actionCreators.initBookData());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);

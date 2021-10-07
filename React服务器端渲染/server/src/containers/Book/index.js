import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router'
import Header from "../../components/Header";
import { actionCreators } from "./store";
import withStyle from "../../withStyle";
import styles from './index.module.css'

class Book extends Component {
    render() {
        if (this.props.login) {
            return (
                <div className={styles.main}>
                    <Header />
                    <div className={styles.h2}>book Page</div>
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

const ExportBook = connect(mapStateToProps, mapDispatchToProps)(withStyle(Book, styles));

ExportBook.loadData = (store) => {
    return store.dispatch(actionCreators.initBookData())
}

export default ExportBook
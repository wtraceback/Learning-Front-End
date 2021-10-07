import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Header from "../../components/Header";
import { actionCreators } from "./store";
import styles from './index.module.css'

class Home extends Component {
    render() {
        if (this.props.login === false) {
            return (
                <div className={styles.main}>
                    <Header />
                    <div>home page</div>
                    {
                        this.props.data.map((item) => {
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
            return <Redirect to="/book" />
        }
    }

    componentDidMount() {
        if (this.props.data.length === 0) {
            this.props.initData();
        }
    }
}

Home.loadData = (store) => {
    // 这个函数负责在服务器端渲染之前，把这个路由需要的数据提前加载好
    return store.dispatch(actionCreators.initData())
}

const mapStateToProps = (state) => {
    return {
        data: state.home.data,
        login: state.header.login,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initData() {
            dispatch(actionCreators.initData());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

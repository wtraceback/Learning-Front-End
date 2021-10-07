import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import { actionCreators } from "./store";
import styles from './index.module.css'
import withStyle from "../../withStyle";

class Home extends Component {
    render() {
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
    }

    componentDidMount() {
        if (this.props.data.length === 0) {
            this.props.initData();
        }
    }
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

const ExportHome = connect(mapStateToProps, mapDispatchToProps)(withStyle(Home, styles));

ExportHome.loadData = (store) => {
    // 这个函数负责在服务器端渲染之前，把这个路由需要的数据提前加载好
    return store.dispatch(actionCreators.initData())
}

export default ExportHome
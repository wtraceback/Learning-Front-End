import React, { Component } from "react";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { actionCreators } from "./store";

class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <div>Hello World</div>
                <button
                    onClick={() => {
                        alert("click");
                    }}
                >
                    click
                </button>
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
        this.props.initData();
    }
}

Home.loadData = (store) => {
    // 这个函数负责在服务器端渲染之前，把这个路由需要的数据提前加载好
    return store.dispatch(actionCreators.initData())
}

const mapStateToProps = (state) => {
    return {
        name: state.home.name,
        data: state.home.data,
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

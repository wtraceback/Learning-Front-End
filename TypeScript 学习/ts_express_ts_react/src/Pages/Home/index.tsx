import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./index.module.css";
import { Spin } from "antd";

class Home extends Component {
    state = {
        isLogin: false,
        loading: true,
    };

    componentDidMount() {
        axios.get("/api/isLogin").then((res) => {
            if (res.data.success) {
                this.setState({
                    isLogin: true,
                    loading: false,
                });
            } else {
                this.setState({
                    loading: false,
                });
            }
        });
    }

    render() {
        if (this.state.loading) {
            return <Spin size="large" tip="Loading..." />;
        } else {
            if (this.state.isLogin) {
                return (
                    <div className={styles.main}>
                        <Link to="/Login">获取数据</Link>
                        <Link to="/Login">展示数据</Link>
                        <Link to="/Login">退出</Link>
                    </div>
                );
            } else {
                return <Redirect to="/login"></Redirect>;
            }
        }
    }
}

export default Home;

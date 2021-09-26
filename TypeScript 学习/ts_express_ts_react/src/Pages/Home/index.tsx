import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./index.module.css";
import { Spin, message } from "antd";

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
                        <Link to="/Login" onClick={(e) => {e.preventDefault(); this.handleLogout()}}>退出</Link>
                    </div>
                );
            } else {
                return <Redirect to="/login"></Redirect>;
            }
        }
    }

    handleLogout() {
        axios.get('/api/logout').then((res) => {
            if (res.data.success) {
                this.setState({
                    isLogin: false,
                    loading: false,
                })
            } else {
                message.error('退出失败');
            }
        })
    }
}

export default Home;

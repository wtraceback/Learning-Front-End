import React, { Component } from 'react'
import { Form, Input, Button, message } from "antd";
import { Redirect } from "react-router-dom";
import qs from 'qs'
import axios from 'axios'
import styles from "./index.module.css";

class Login extends Component {
    state = {
        isLogin: false,
    }

    onFinish = (values: any) => {
        console.log("Success:", values);
        axios.post("/api/login", qs.stringify({
            username: values.username,
            password: values.password,
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((res) => {
            if (res.data.success) {
                this.setState({
                    isLogin: true
                })
            } else {
                message.error(res.data.msg);
            }
        });
    };

    onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    render() {
        if (this.state.isLogin) {
            return <Redirect to="/"></Redirect>
        } else {
            return (
                <div className={styles.main}>
                    <Form
                        name="basic"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入用户名",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入登录密码",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            );
        }
    }
};

export default Login;
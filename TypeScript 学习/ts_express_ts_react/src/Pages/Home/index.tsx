import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Spin, message } from "antd";
import ReactECharts from 'echarts-for-react';
import styles from "./index.module.css";

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
                    <>
                        <div className={styles.main}>
                            <Link to="/Login" onClick={(e) => {e.preventDefault(); this.handleCrowllerData()}}>获取数据</Link>
                            <Link to="/Login">展示数据</Link>
                            <Link to="/Login" onClick={(e) => {e.preventDefault(); this.handleLogout()}}>退出</Link>
                        </div>
                        <div>
                            <ReactECharts
                                option={this.getOption()}
                            />
                        </div>
                    </>
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

    handleCrowllerData() {
        axios.get('/api/getData').then((res) => {
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

    getOption() {
        const option = {
            dataset: [
              {
                dimensions: ['name', 'age', 'profession', 'score', 'date'],
                source: [
                  ['Hannah Krause', 41, 'Engineer', 314, '2011-02-12'],
                  ['Zhao Qian', 20, 'Teacher', 351, '2011-03-01'],
                  ['Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
                  ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
                  ['Karle Neumann', 25, 'Engineer', 253, '2011-04-02'],
                  ['Adrian Groß', 19, 'Teacher', '-', '2011-01-16'],
                  ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
                  ['Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
                  ['Han Meimei', 67, 'Engineer', 366, '2011-03-12']
                ]
              },
              {
                transform: {
                  type: 'sort',
                  config: { dimension: 'score', order: 'desc' }
                }
              }
            ],
            tooltip: {
                trigger: 'axis',
                formatter: function(params: any) {
                    console.log(params);
                    return `${params[0].name}<br>${params[0].seriesName}`
                }
            },
            xAxis: {
              type: 'category',
              axisLabel: { interval: 0, rotate: 30 }
            },
            yAxis: {},
            series: {
              type: 'bar',
              encode: { x: 'name', y: 'score' },
              datasetIndex: 1,
              itemStyle: {
                  normal: {
                      label: {
                          show: true, // 开启显示
                          position: 'top', // 在上方显示
                          textStyle: {
                            color: 'black',
                            fontSize: 16
                          }
                      }
                  }
              }
            }
          }

          return option
    }
}

export default Home;

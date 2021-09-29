import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Spin, message, Button } from "antd";
import ReactECharts from 'echarts-for-react';
import styles from "./index.module.css";

enum IDataEnum {
    name = 'name',
    quote = 'quote',
    score = 'score',
    ranking = 'ranking',
    cover_url = 'cover_url',
    evaluators_num = 'evaluators_num',
}

class Home extends Component {
    public echarts: any
    state: DataType.IState = {
        isLogin: false,
        loading: true,
        dimensions_arr: [],
        data: [],
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

        axios.get("/api/showData").then((res) => {
            if (res.data.success) {
                // 维度 key 值
                var dimensions_arr: string[] = [IDataEnum.name, IDataEnum.quote, IDataEnum.score, IDataEnum.ranking, IDataEnum.cover_url, IDataEnum.evaluators_num]

                // 对数据进行处理
                res.data.data.forEach((value: DataType.IMovieItem, index: number) => {
                    value[IDataEnum.name] = value[IDataEnum.name].split(' ')[0]
                    value[IDataEnum.evaluators_num] = parseInt(value[IDataEnum.evaluators_num]).toString()
                })

                this.setState({
                    dimensions_arr: dimensions_arr,
                    data: res.data.data,
                })

                // echarts 高度的自适应
                // res.data.data.length 为柱状图的条数，即数据长度
                // 60 x轴 内容的高度
                var auto_height = res.data.data.length * 60
                this.echarts.getEchartsInstance().resize({ height: auto_height })
            } else {
                message.error('请先获取数据')
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
                            <Button
                                className={styles.butn}
                                type="primary"
                                onClick={ this.handleCrowllerData }
                            >
                                获取数据
                            </Button>
                            <Button
                                className={styles.butn}
                                type="primary"
                                onClick={ this.handleLogout }
                            >
                                退出
                            </Button>
                        </div>
                        <div>
                            <ReactECharts
                                ref={(e) => { this.echarts = e; }}
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
                message.info('数据抓取成功，请刷新画面重新展示');
            } else {
                message.error('数据抓取失败');
            }
        })
    }

    getOption() {
        // 指定图表的配置项和数据
        var option = {
            title: {
                // 大标题
                text: '豆瓣电影Top250'
            },
            tooltip: {
                // 鼠标悬浮在柱状图上时，显示的信息
                trigger: 'axis',
                formatter: function (params: any) {
                    return `
                        ${params[0].data.name}<br>
                        排名：第 ${params[0].data.ranking} 名<br>
                        ${params[0].data.evaluators_num}人评价
                    `
                }
            },
            legend: {},
            xAxis: {},
            yAxis: {
                type: 'category',
                inverse: true
            },
            dataset: {
                // 提供一份数据
                // dimensions 对应的key值，dimensions = ['name', 'quote', 'score', 'ranking', 'cover_url', 'evaluators_num']
                /*
                    source = [{
                        "name": "肖申克的救赎",
                        "score": "9.7",
                        "quote": "希望让人自由。",
                        "cover_url": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg",
                        "ranking": "1",
                        "evaluators_num": "2453766人评价"
                    }]
                    */
                dimensions: this.state.dimensions_arr,
                source: this.state.data
            },
            series: [
                {
                    type: 'bar',
                    // 柱状体的高度
                    barWidth: 30,
                    encode: {
                        // 将 "evaluators_num" 列映射到 X 轴。
                        x: 'evaluators_num',
                        // 将 "name" 列映射到 Y 轴。
                        y: 'name'
                    },
                    label: {
                        // 柱状体中是否显示相关信息
                        show: true,
                        // 引用特定维度的值
                        formatter: '第 {@ranking} 名'
                    },
                },
            ]
        };

        return option
    }
}

export default Home;
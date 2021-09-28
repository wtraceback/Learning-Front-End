import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Spin, message } from "antd";
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

interface IMovieItem {
    name: string,
    quote: string,
    score: string,
    ranking: string,
    cover_url: string,
    evaluators_num: string,
}

interface IState {
    isLogin: boolean,
    loading: boolean,
    dimensions_arr: string[],
    data: IMovieItem[],
}

class Home extends Component {
    public echarts: any
    state: IState = {
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
            console.log('showData res', res);

            if (res.data.success) {
                var dimensions_arr: string[] = [IDataEnum.name, IDataEnum.quote, IDataEnum.score, IDataEnum.ranking, IDataEnum.cover_url, IDataEnum.evaluators_num]

                // 对数据进行处理
                res.data.data.forEach((value: IMovieItem, index: number) => {
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
                            <Link to="/Login" onClick={(e) => { e.preventDefault(); this.handleCrowllerData() }}>获取数据</Link>
                            <Link to="/Login">展示数据</Link>
                            <Link to="/Login" onClick={(e) => { e.preventDefault(); this.handleLogout() }}>退出</Link>
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
                message.error('数据抓取成功，请刷新画面重新展示');
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
                trigger: 'axis',
                formatter: function (params: any) {
                    // console.log(params);
                    return `${params[0].name}<br>${params[0].value}人评价`
                }
            },
            legend: {},
            xAxis: {},
            yAxis: {
                type: 'category',
                inverse: true
            },
            dataset: {
                dimensions: this.state.dimensions_arr,
                source: this.state.data
            },
            series: [
                {
                    type: 'bar',
                    barWidth: 30,
                    encode: {
                        // 将 "evaluators_num" 列映射到 X 轴。
                        x: 'evaluators_num',
                        // 将 "name" 列映射到 Y 轴。
                        y: 'name'
                    },
                    label: {
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


// 自适应
// https://www.jianshu.com/p/9fc7d6b50178
// 数据集
// https://www.runoob.com/echarts/echarts-dataset.html
// https://blog.csdn.net/hwhsong/article/details/109319162

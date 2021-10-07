const Path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    // 打包的类型是 node 服务器端
    target: "node",
    // const express = require('express')
    // 添加了 external 之后，才不会将引入的 express react 导入到打包的文件中
    // 还会保存之前的引用形式
    externals: [nodeExternals()],
    // 打包的模式 development 还是 production
    mode: "development",
    // 入口文件
    entry: "./src/server/index.js",
    // 打包后的位置
    output: {
        filename: "bundle.js",
        path: Path.resolve(__dirname, "build"),
    },
    // 打包编译的规则
    module: {
        rules: [
            {
                // 如果是 js 为后缀名的文件，就用 babel-loader 编译器来对它进行编译
                // babel-loader babel-core 需要安装
                test: /\.js?$/,
                loader: "babel-loader",
                // 排除掉 node_modules 里面的 js 文件
                exclude: /node_modules/,
                // 配置一些规则，使用 babel-loader 时，也对 react 的代码进行编译
                options: {
                    //  babel-preset-react babel-preset-stage-0 babel-preset-env 都需要安装
                    // 要以什么规则（方式）转换我们的js文件
                    presets: [
                        "react",
                        "stage-0",
                        [
                            // 打包的过程中如何根据环境做一些适配
                            "env",
                            {
                                // 打包过程中，babel 会去兼容主流浏览器的最新两个版本
                                targets: {
                                    browsers: ["last 2 version"],
                                },
                            },
                        ],
                    ],
                },
            }, {
                test: /\.css?$/,
                use: ['isomorphic-style-loader', {
                      loader: 'css-loader',
                      options: {
                        importLoaders: 1,
                        esModule: false,
                        modules: {
                            // 自定义生成的类名
                            localIdentName: '[name]_[local]_[hash:base64:5]',
                        }
                      }
                }]
            }
        ],
    },
};

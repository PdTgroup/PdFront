const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');//主页脚本自动添加插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
module.exports = {
    devtool: 'source-map',//可用于开发环境调试,找出源码的出错地方
    // devServer: {//配置一个服务自动刷新浏览器内容,应用于开发环境，不可用于生长产环境，其存在的意义在于便于开发
    //     contentBase: './dist',
    //      host: "localhost",
    //      port: "8090",
    //      open: true, // 开启浏览器
    //      hot: true   // 开启热更新
    // },
    mode: "production",//【生产环境 4.39默认启动】压缩代码，删除为被引用的代码,
    // mode: "development",//【开发环境便于代码调试，不压缩代码】
    entry:{//js分离入口
        "line":'./src/control/lineConfig.js',
        "bar":'./src/control/barConfig.js',
        "pie":'./src/control/pieConfig.js',
        "pie2":'./src/control/pie2Config.js',
        "map":'./src/control/mapConfig.js',
        "radar":'./src/control/radarConfig.js'
        // "print":'./src/print.js'
    },
    output: {
        filename: 'public/js/[name].bundel.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
    },
    plugins:[
        new MiniCssExtractPlugin({//css 代码压缩
            filename: 'public/css/[name].css',//输出css 的文件名，后面包含路由
            chunkFilename: '[id].css',
            ignoreOrder: false, // 是否安顺序输出css
        }),
        new CleanWebpackPlugin(),//编译时清除原来目录结构
        new HtmlWebpackPlugin({//页面生成器
            title: 'line',//
            filename: "line.html",
            chunks: ['line',"line"],  // 按需引入对应名字的js文件
            template: "./src/views/line.html"
        }),
        new HtmlWebpackPlugin({//页面生成器
            title: 'bar',//
            filename: "bar.html",
            chunks: ['bar',"bar"],  // 按需引入对应名字的js文件
            template: "./src/views/bar.html"
        }),
        new HtmlWebpackPlugin({//页面生成器
            title: 'pie',//
            filename: "pie.html",
            chunks: ['pie',"pie"],  // 按需引入对应名字的js文件
            template: "./src/views/pie.html"
        }),
        new HtmlWebpackPlugin({//页面生成器
            title: 'pie2',//
            filename: "pie2.html",
            chunks: ['pie2',"pie2"],  // 按需引入对应名字的js文件
            template: "./src/views/pie2.html"
        }),
        new HtmlWebpackPlugin({//页面生成器
            title: 'map',//
            filename: "map.html",
            chunks: ['map',"map"],  // 按需引入对应名字的js文件
            template: "./src/views/map.html"
        }),
        new HtmlWebpackPlugin({//页面生成器
            title: 'radar',//
            filename: "radar.html",
            chunks: ['radar',"radar"],  // 按需引入对应名字的js文件
            template: "./src/views/radar.html"
        })
    ],
    optimization: {
        minimizer: [//css 代码压缩
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: "./public/images",
                        outputPath: "public/images"
                    }
                }]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src'],
                        minimize: true//启用最小值，进行代码压缩
                    }
                }
            }
        ]
    }
};
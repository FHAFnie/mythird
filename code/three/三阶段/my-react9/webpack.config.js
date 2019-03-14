// webpack  配置  
// 入口
// 出口
// 规则
// 插件

// js  / png / scss/less/css  
// .vue 单文件组件

const path = require("path");  // node 模块 处理路径逻辑 
const htmlWebpackPlugin = require("html-webpack-plugin");  // 操作HTML 
const openBrowserWebpackPlugin = require("open-browser-webpack-plugin"); // 打开浏览器
const extractTextWebpackPlugin = require("extract-text-webpack-plugin")  // 抽离样式 样式独立出去

module.exports = {
    entry:[ "./src/main.js"],
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"js/[name].[hash:8].js",  // 生成 hash规则解密解析的长度为8 的随机字符串  阻止浏览器缓存
        publicPath:"", // 公共路径 上线需要配置 
    },
    devtool:"source-map",
    
    resolve:{
        alias:{  // 别名
            "react":path.resolve(__dirname,'node_modules','react')
        }
    },

    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:['babel-loader']
            },
            {
                test:/\.(png|gif|svg|jpg|woff|woff2|eot|ttf)\??.*$/,
                use:["url-loader?limit=8192&name=font/[hash:8].[name].[ext]"]   // 8M  ext扩展名  
            },
            {
                test:/\.(css|scss)$/,
                use:extractTextWebpackPlugin.extract({
                    fallback:"style-loader",  // 转化为 node 风格代码
                    use:[  "css-loader",    //  css 转化为 commonJs模块 
                        {
                            loader:"postcss-loader",  // 模块 
                            options:{
                                plugins:function(){
                                    return [
                                        require("cssgrace"), // 美化 css 
                                        require('postcss-px2rem-exclude')(
                                            {
                                                remUnit:100,
                                                exclude:/antd-mobile/i,  // 排除 mint-ui 不需要进行 rem 转换 
                                            }
                                        ), // px 转 rem 
                                        require("autoprefixer")() // 自动补全 实现兼容 
                                    ]
                                }
                            } 
                        },
                        "sass-loader"   //  编译 scss 为 css 代码 
                    ], 
                })
            },
        ]
    },

    devServer:{
        contentBase:path.join(__dirname,"dist"),
        compress:true,
        hot:true,
        inline:true,
        host:"0.0.0.0",
        port:7000,
        // open:true, 
        publicPath:"",
        proxy:{    // 代理 

        },
        // historyApiFallback:true  // 处理 history 路由模式 
    },

    plugins:[
        new htmlWebpackPlugin({
            template:"./src/index.html", //声明 编译 HTML 文件
            inject:true,  // 自动注入 css/js link script  
        }),

        new openBrowserWebpackPlugin({url:"http://localhost:7000"}),

        new extractTextWebpackPlugin({
            filename:'css/app.[hash:8].css',
            allChunks:true , // 抽离所有的数据
            disable:false   // true 无法样式抽离
        })
    ]
}
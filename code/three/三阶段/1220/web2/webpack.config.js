

// webpack 配置文件
// 入口 entry
// 出口  output
// 规则  loader   module
// 插件  plugins

// js css/scss/less  png vue
module.exports = {
    entry:"./entry.js",
    output:{
        filename:"bundle.js",
        path:__dirname
    },
    module:{
        rules:[
            {
                test:/\.css$/,use:['style-loader','css-loader']
            },
            {
                test:/\.scss$/,use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.less$/,use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.js$/,
                exclude:/node_modules/, // 不会去 node_modules 搜索 打包文件
                use:[
                    "babel-loader"
                ]
            }
        ]
    },
    devtool:"source-map",  // 方便开发者调试
}

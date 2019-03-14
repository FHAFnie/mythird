
//这是配制文件
// webpack  配置
// 入口
// 出口
// 规则
// 插件

var path=require("path");//node里面自带的模块
var htmlWebpackPlugin=require("html-webpack-plugin");
const openBrowserWebpackPlugin=require("open-browser-webpack-plugin");

const extractTextWebpackPlugin =require("extract-text-webpack-plugin");//将样式单独剥离出去的插件
module.exports={
  entry:["./src/main.js"],//主要接口文件，重要
  output:{//出口文件，可以设置多个。。。
    path:path.resolve(__dirname,'dist'),//在根目录下新建一个dist文件夹，专门存放出口文件
    filename:"js/[name].[hash:8].js",//，注意，前面加了js，代表，会在dist文件夹下面新建js文件夹，然后再存放，出口的js文件，另外出口的js文件会以hash规则生成文件名，防止浏览器缓存的问题
    publicPath:"", // 公共路径 上线需要配置
  },
  devtool:"source-map",
  //自启动服务，需要安装热启动组件

  resolve:{//配制vue的环境
    alias:{  // 别名
      'vue':'vue/dist/vue.js'
    }
  },
  // 配制规则：
  module:{
    rules:[
      {//导入js规则
        test:/\.js$/,
        exclude:/node_modules/,
        use:["babel-loader"]
      },
      {//图片规则
        test:/\.(png|jpg|gif|svg|woff|woff2|eot|ttf)\??.*$/,
        //图片引入后，存放的地址，limit限制8M，文件夹font下面
        use:["url-loader?limit=8192&name=font/[hash:8].[name].[ext]"],
        // test:/\.(png|gif|svg|jpg|woff|woff2|eot|ttf)\??.*$/,
        // use:["url-loader?limit=8192&name=font/[hash:8].[name].[ext]"]   // 8M  ext扩展名
      },
      {//导入scss样式
        test:/\.(css|scss)$/,//已css和scss结尾的文件
        use:extractTextWebpackPlugin.extract({
          fallback:"style-loader",// 转化为 node 风格代码
          use:[
            "css-loader",//css转化为commonjs模块
            {
                loader:"postcss-loader",//模块
                options:{
                  plugins:function(){
                    return [
                      require("cssgrace"),//css美化
                      // require('postcss-px2rem-exclude')(
                      //         {
                      //             remUnit:100,
                      //             exclude:/element-ui/i,  // 排除 mint-ui 不需要进行 rem 转换
                      //         }
                      // ), // px 转 rem
                      require("autoprefixer")()//自动补全，实现兼容
                    ]
                  }
                }
            },
            "sass-loader" //编译scss代码为css代码
          ]
        })
      },
      {
        test:/\.(css|less)$/,//以less结尾的文件
        use:extractTextWebpackPlugin.extract({
          fallback:"style-loader",//转化为 node 风格代码
          use:[
            "css-loader",//css代码
            {
              loader:"postcss-loader",
              options:{
                plugins:function(){
                          return [
                            require("cssgrace"),//美化css代码
                            require("autoprefixer")()//自动补全
                          ]
                        }
              }
            },
            "less-loader"  //编译less代码为css代码
          ]
        })
      },
      {//引入vue规则
        test:/\.vue$/,//vue文件
        loader:"vue-loader",
        options:{
          loaders:[
            {
              'css':"style-loader!css-loader"
            },
            {
              'scss':"style-loader!css-loader!sass-loader"
            },
            {
              'less':"style-loader!css-loader!less-loader"
            }
          ]
        }
      }
    ]
  },
  devServer:{
    contentBase:path.join(__dirname,"dist"),
    compress:true,
    hot:true,
    inline:true,
    host:"0.0.0.0",
    port:8000,
    // open:true,
    publicPath:"",
    proxy:{    // 代理
    },
    // historyApiFallback:true  // 处理 history 路由模式
  },
  plugins:[
    new htmlWebpackPlugin({
      // template:"./src/index.html", //声明 编译 HTML 文件
      // inject:true,  // 自动注入 css/js link script
      template:"./src/index.html",
      inject:true,
    }),
    //自动打开浏览器
    new openBrowserWebpackPlugin({url:"http://localhost:8000"}),
    new extractTextWebpackPlugin({
      filename:'css/app.[hash:8].css',
      allChunks:true , // 抽离所有的数据
      disable:false   // true 无法样式抽离
    })
  ]
}








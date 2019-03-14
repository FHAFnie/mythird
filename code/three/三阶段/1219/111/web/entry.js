
console.log("这是 入口文件 ...");

//  ./ 表示同级文件  ../  上一级文件  __dirname
//引入js文件
var {arr,word} = require("./name");


document.getElementById("app").textContent += "hello - webpack"  +  word  + arr[0]

//引入css文件
// require("style-loader!css-loader!./style.css");


//引入scss文件
// require("style-loader!css-loader!sass-loader!./demo.scss");


//引入less文件
require("style-loader!css-loader!less-loader!./index.less");


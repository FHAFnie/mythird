

console.log("这是 入口文件 ...");

//  ./ 表示同级文件  ../  上一级文件  __dirname
var {arr,word} = require("./name");


document.getElementById("app").textContent += "hello - webpack"  +  word  + arr[0]

// require("style-loader!css-loader!./style.css");

// require("style-loader!css-loader!sass-loader!./demo.scss");

require("style-loader!css-loader!less-loader!./index.less");


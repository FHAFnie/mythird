

console.log("这是 入口文件 ...");

//  ./ 表示同级文件  ../  上一级文件  __dirname
// var {arr,word} = require("./name");
import {arr,word} from "./name";


// import obj from "./es6";
// console.log(obj);

import {msg,hello} from "./es6";

document.getElementById("app").innerHTML += "hello - webpack"  +  word  + arr[0] + "<h2>"+msg+"</h2>" + hello;

// require("style-loader!css-loader!./style.css");

// require("style-loader!css-loader!sass-loader!./demo.scss");

// require("style-loader!css-loader!less-loader!./index.less");

// require("./style.css");
// require("./demo.scss");
// require("./index.less");

import "./demo.scss";


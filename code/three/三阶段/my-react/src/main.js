console.log("这是react 入口文件");


import "./scripts";
import "./styles/index.scss";

// import React from "react";     // 封装 react 组件
// import ReactDOM from "react-dom"; // 渲染 组件 ReactDOM.render





// 创建组件  ES6
// class 定义构造函数  extends 继承
// class App extends React.Component{
//     // 渲染
//     render(){
//         return (
//             <div>
//                 <h2>App- App -App  </h2>
//             </div>
//         )
//     }
// }
// // ES5
// // const Home = React.createClass({
// //     render(){
// //         return (
// //             <div>
// //                 <h2> home  - home -home </h2>
// //             </div>
// //         )
// //     }
// // })

// const Home =  () =>{
//    return (
//        <div>
//            <h2>HOme - home -home </h2>
//        </div>
//    )
// }


// //  ReactDOM.render(虚拟DOM,真实DOM)
// //          ReactDOM.render(<Component/>,app);

// // 6. jsx 语法规则
// // 遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；
// // 遇到代码块（以 { 开头），就用 JavaScript 规则解析


// ReactDOM.render(
//     <div>hello react</div>,
//     document.getElementById("app")
// )

// const word = "1807 daydayup";
// // 一个组件只能有一个顶层标签
// ReactDOM.render(
//     <div>
//         <h2>
//             {/* react so easy */}
//             <App/>
//             <Home/>
//         </h2>
//         <h4>
//             { word }
//         </h4>
//     </div>
//     ,
//     document.getElementById("one")
// )




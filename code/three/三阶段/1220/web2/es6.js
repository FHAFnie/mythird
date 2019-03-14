
// es6 ECMAScript2015  es2015
// 第六代 规则版本

// ES6 用法普遍  有的浏览器 自动识别  ES6 语法
// let const export import class  yield *function(){}

const hello = "webpack so easy";

let msg = "wuhan1807 daydayup"

class Person{
    constructor(name,age,id){
        this.id = id;
        this.age = age;
    }
}

function Student(id,age){
    this.id = id;
    this.age = age;
}

// 这种接口暴露 没法 对象解构取值
// export default {
//     msg,
//     hello
// }

export {msg}     // exports.msg = msg
export {hello}

// 接口暴露
// export default   === module.exports   == {msg  }
// export = exports

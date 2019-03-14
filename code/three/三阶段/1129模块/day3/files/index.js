


// 读取文件  
var fs = require("fs");

module.exports = {
    readHtml(path,res){
        fs.readFile(path,'utf-8',(err,data)=>{
            if(err) throw err;
            // console.log(data);
            res.writeHead(200,{"Content-Type":'text/html;charset=utf-8'});
            res.write(data);
            res.end();
        })
    },
    readImg(path,res){
        // binary 二进制 
        fs.readFile(path,'binary',(err,data)=>{
            if(err) throw err;
            res.writeHead(200,{'Content-Type':'image/jpeg'}); // 读取图片 的响应头
            res.write(data,'binary');  // 返回图片
            res.end();
        })
    },
    readHtmlPost(path,res,postBody){
        var array = ['username','password'];
        var username = postBody.username;
        var password = postBody.password;
        // 正则  /^1(3|5|7|8|9){9}\d$/  /^[a-zA-Z0-9]{6,18}$/
        // g golbal 全局匹配正则
        // i ignore  忽视大小写
        // new RegExp('^[a-zA-Z0-9]{6,18}$')  传变量 

        fs.readFile(path,'utf-8',(err,data)=>{
            if(err) throw err;
            array.forEach((item,index)=>{
                var reg = new RegExp("{"+item+"}",'gi');
                data = data.replace(reg,postBody[item]);
            })

            if(username&&password){
                // 已经登陆
                data = data.replace(/{formClass}/gi,'hide');
                data = data.replace(/{infoClass}/gi,'')
                data = data.replace(/{flag}/gi,'登陆成功!')
            }else{
                // 尚未登陆
                data = data.replace(/{formClass}/gi,'');
                data = data.replace(/{infoClass}/gi,'hide')
                data = data.replace(/{flag}/gi,'请登陆z!')
            }
            console.log(data);

            res.writeHead(200,{"Content-Type":'text/html;charset=utf-8'});
            
            res.write(data);
            res.end();
        })
    }
}
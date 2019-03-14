export  function isUserName(rule,value,callback){
  const reg=/^[a-zA-Z_$][0-9a-z_$]{5,11}$/ig;
  //验证用户名
  console.log(1111);
  // console.log(name)
  console.log(rule);


}

export function isPassword(password){
  const reg=/^[a-zA-Z_$][0-9a-zA-Z_$]{7,19}$/ig;
  // console.log(22222);
}


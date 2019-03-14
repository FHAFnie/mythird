//这是主要的配制文件-------创建vm文件

import Vue from "vue";
import ElementUI from "element-ui";
Vue.use(ElementUI)  // 全局声明

import router from "./router";

// import ElementUI from "element-ui";
// Vue.use(ElementUI)  // 全局声明
import store from "./vuex/store";


Vue.filter("dateFormate",(value,str)=>{
    if(!value){
      return value;
    }
    var time = new Date(value);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    month=month>=10?month:"0"+month;
    var day = time.getDate();
    day=day>=10?day:"0"+day;
    var hour = time.getHours();
    hour=hour>=10?hour:"0"+hour;
    var minutes = time.getMinutes();
    minutes=minutes>=10?minutes:"0"+minutes;
    var seconde = time.getSeconds();
    seconde=seconde>=10?seconde:"0"+seconde;
      str = str || "-";
    return `${year}${str}${month}${str}${day} ${hour}:${minutes}:${seconde}`;
})
Vue.filter("money",(value,str)=>{
  if(!value){
    return value;
  }
  str = str || "￥";
  return str+value;
})

Vue.filter("fixed",(value,num)=>{
  if(!value){
    return value;
  }
  num=num||2;
  return value.toFixed(num)
})
Vue.filter("moneyType",(value,type)=>{
  type=type||"￥";
  if(!value){
      return type+"0";
  }
  return type+value;
})



const vm=new Vue({
  el:"#app",
  router,
  store,
  data:{
    title:"礼物网主页",
  },
});

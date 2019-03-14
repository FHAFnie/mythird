import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './vuex/store.js';
import "./styles/index.scss";
Vue.config.productionTip = false

import MintUI from "mint-ui";
import store from "./vuex/store";

Vue.use(MintUI)



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


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

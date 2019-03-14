

function dateFormat(date,str){
var time=new Date(date);
var year=time.getFullYear();
var month=time.getMonth()+1;
month=month<10?"0"+month:month;
var day=time.getDate();
day=day<10?"0"+day:day;
var hours=time.getHours();
hours=hours<10?"0"+hours:hours;
var minutes=time.getMinutes();
minutes=minutes<10?"0"+minutes:minutes;
var seconds=time.getSeconds();
seconds=seconds<10?"0"+seconds:seconds;

str=str||"-";

return `${year}${str}${month}${str}${day} ${hours}:${minutes}:${seconds}`
}


exports.dateFormat=dateFormat;

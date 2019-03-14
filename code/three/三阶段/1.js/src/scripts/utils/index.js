

import url from "url";

function getQuery(search){
    return url.parse(search,true).query;
}


exports.getQuery = getQuery;


export const query = getQuery


export function uniq(array){
    console.log(array);
    var temp = [{title:""}]; //一个新的临时数组
    for(var j=0;j<temp.length;j++){
        for(var i = 0; i < array.length; i++){  
            if(temp[j].title.indexOf(array[i].type.text) == -1){
                console.log(temp);
                temp.push({title:array[i].type.text,value:array[i].type.value});
            }
        } 
    }
    return temp;
}

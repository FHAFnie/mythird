

import url from "url";

function getQuery(search){
    return url.parse(search,true).query;
}


exports.getQuery = getQuery;


export const query = getQuery
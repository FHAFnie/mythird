


export default {
    // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
    add(state,payload){
        console.log(state);
        state.carNumber+=payload;
    },
    desc(state,payload){
        state.carNumber -=payload;
        console.log(payload)
        // return {...state,...{carNumber:state.carNumber-payload}}
    },
    changeCity(state,city){
        state.city = city;
    },
    getMv(state,mv){

        state.mv = mv;
    },
    getAllGoods(state,allgoods){
        state.allgoods = allgoods;
    },
    updateInp(state,inp){
        state.inp = inp;
    },
    getGoods(state,goods){
        state.goods = goods;
    },
    addCarList(state){
        return state;
    },

    getCarList(state,carList){
        console.log('carList');        
        console.log(carList);
        state.carList = carList
    },
    setTotal(state,obj){
        state.priceTotal = obj.priceTotal;
        state.selectNum = obj.selectNum;
    },
    delCheckAsync(state){
        return state;
    },
    delOneAsync(state){
        return state;
    }


    
}


import "./index.scss";
import React, {Component}  from "react";
import Head from "../../components/head"

import  axios from "axios";
import {Toast,WhiteSpace,Tabs} from "antd-mobile";

import GoodList from "../goodList"
export default class Goods extends Component{

    state = {
        goods:[],
        tabs:[],
    }

    reverseGoods=()=>{
        this.setState({
            goods:this.state.goods.reverse()
        })
    }

    componentWillMount(){
        Toast.loading('加载中...', 1, () => {
            
        });
        axios.get("http://localhost:3100/vue/getgoods")
        .then(res=>{
            setTimeout(()=>{
                var tab = []
                res.data.result.forEach((val,index)=>{
                    if(index<4){
                        tab.push({title:val.type.text,value:val.type.value})
                    }
                });
                console.log(tab);
                this.setState({
                    goods:res.data.result,
                    tabs:tab
                });
                Toast.hide();
                Toast.info("请求成功!",1);
            },1000)
        })
    }

    render(){
        let {tabs} = this.state;
        return (
            <div className="box">
                <Head title="商品"></Head>        
                <Tabs tabs={tabs} initialPage={0} animated={true} useOnPan={false}>
                    {
                        tabs.map((tab,index)=>{
                            return (
                                <GoodList reverseGoods={this.reverseGoods} key={index} tab={tab} data={this.state.goods} ></GoodList>
                            )
                        })
                    }
                </Tabs>   
            </div>
        )
    }
}
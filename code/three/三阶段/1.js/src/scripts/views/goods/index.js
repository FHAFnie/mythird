

import "./index.scss";
import React, {Component}  from "react";
import Head from "../../components/head"

import  axios from "axios";
// 接口代理
// axios.defaults.baseURL = "http://localhost:3100";  // 本地接口
axios.defaults.baseURL = "http://47.94.208.182:3100";  // 线上接口


import {Toast,WhiteSpace,Tabs} from "antd-mobile";

import GoodList from "../goodList";
import store from "../../store";
import { getGoods, reverseData } from "../../actions";

import {connect} from "react-redux"

@connect(
    state=>{
        return {
            banner:state.banner
        }
    }
)
export default class Goods extends Component{

    state = {
        goods:[],
        tabs:[],
    }

    reverseGoods=()=>{
        // this.setState({
        //     goods:this.state.goods.reverse()
        // })

        // 发出actions 
        this.props.dispatch(reverseData())
    }

    componentWillMount(){
        Toast.loading('加载中...', 1, () => {
            
        });

        setTimeout(()=>{
            this.props.dispatch(
                getGoods({url:"/vue/getgoods",callback:()=>{
                    
                    Toast.hide();
                    Toast.info("请求成功!",1);
                }})
            )
        },1000)
        // axios.get("/vue/getgoods")
        // .then(res=>{
        //     setTimeout(()=>{
        //         var tab = []
        //         res.data.result.forEach((val,index)=>{
        //             if(index<4){
        //                 tab.push({title:val.type.text,value:val.type.value})
        //             }
        //         });
        //         console.log(tab);
        //         this.setState({
        //             goods:res.data.result,
        //             tabs:tab
        //         });
        //         Toast.hide();
        //         Toast.info("请求成功!",1);
        //     },1000)
        // })
    }

    render(){
        // let {tabs} = this.state;
        // let { banner:{tabs,goods} }  = store.getState();
        let { banner:{tabs,goods} }  = this.props;


        return (
            <div className="box">
                <Head title="商品"></Head>        
                <Tabs tabs={tabs} initialPage={0} animated={true} useOnPan={false}>
                    {
                        tabs.map((tab,index)=>{
                            return (
                                <GoodList reverseGoods={this.reverseGoods} key={index} tab={tab} data={goods} ></GoodList>
                            )
                        })
                    }
                </Tabs>   
            </div>
        )
    }
}
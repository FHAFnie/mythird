

import "./index.scss";
import React, {Component}  from "react";

import  axios from "axios";
import {Toast,WhiteSpace,Tabs,PullToRefresh} from "antd-mobile";
import {Link} from "react-router-dom"

export default class GoodList extends Component{


    state = {
        refreshing:false  // 没有在刷新 
    }

    componentWillMount(){
        
    }

    render(){
        let {tab,data,reverseGoods} = this.props;
        let myData = data&&data.filter((item,index)=>item.type.value==tab.value);
        console.log(myData);
        return (
           <div>
               <PullToRefresh
                    damping={60}
                    ref="scrolling"
                    style={{
                        overflow: 'auto',
                    }}
                    indicator={{ deactivate: '下拉刷新' }}
                    direction={'down'}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({ refreshing: true });  // 表示正在刷新

                        setTimeout(() => {
                            // myData = myData.reverse(); 修改 props
                            reverseGoods();
                            this.setState({ refreshing: false });  // 刷新完成
                        }, 2000);
                    }}
                >
               {
                   myData.map((item,index)=>{
                       return (
                        <div className="moveIn" key={index} style={{width:'100%'}}>
                            <WhiteSpace/>
                                <Link to={"/goods/detail/"+item._id+"?name="+item.name+"&img="+item.img} > 
                                    <img width='100%' height={300} src={item.img} alt=""/>
                                    <h4>{item.name}</h4>
                                    <p>价格 : {item.price} -- {item.discount}</p>
                                </Link>
                            </div>
                       )
                   })
               }
             </PullToRefresh>
           </div>
        )
    }
}
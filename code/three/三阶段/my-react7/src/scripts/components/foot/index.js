

import "./index.scss";
import React, {Component}  from "react";
import {NavLink} from "react-router-dom";

import { TabBar } from 'antd-mobile';

export default class Foot extends Component{
    state = {
        foots:[
            {txt:"首页",path:"/app/home",name:"home",icon:"icon-home"},
            {txt:"商品",path:"/app/goods",name:"goods",icon:"icon-goodsfill"},
            {txt:"购物车",path:"/app/car",name:"car",icon:"icon-shop_car"},
            {txt:"我",path:"/app/my",name:"my",icon:"icon-my"},
        ],
        selectedTab:'home'
    }

    componentWillMount(){
        let {location} = this.props;
        console.log(location);

        var tab = location.pathname.replace("/app/","");
        console.log(tab);
        this.setState({
            selectedTab:tab
        })
    }


    render(){

        return (
           <div className="foot-tab">
               <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"

                >
                {
                    this.state.foots.map((foot,index)=>{
                        return (
                            <TabBar.Item
                                title={foot.txt}
                                key={index}
                                icon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
                                    />
                                }
                                selectedIcon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                                    />
                                }
                                selected={this.state.selectedTab === foot.name}
                                onPress={() => {
                                    this.setState({
                                        selectedTab:foot.name
                                    });
                                    let {history} = this.props;
                                    history.push(foot.path);
                                }}
                            >
                            </TabBar.Item>
                        )
                    })
                }
                </TabBar>
           </div>
        )
    }
}

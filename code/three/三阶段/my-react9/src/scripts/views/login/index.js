

import "./index.scss";
import React, {Component}  from "react";

import Head from "../../components/head"

import {  WhiteSpace, WingBlank ,Button,List, InputItem} from 'antd-mobile';
export default class Login extends Component{

    render(){
   
        return (
            <div className="box">
                <Head title="登录" show={true} history={this.props.history} ></Head> 
                <WingBlank>
                    <List>
                       
                        <label htmlFor="">
                        <WhiteSpace/>
                        <InputItem
                            type="tel"
                            ref="mobile"
                            placeholder="请输入手机号"
                            clear
                            moneyKeyboardAlign="left"
                            
                        >手机号</InputItem>
                        </label>
                        
                        <label htmlFor="">
                        <WhiteSpace/>
                        <InputItem
                            type="text"
                            ref="code"
                            placeholder="请输入验证码"
                            moneyKeyboardAlign="left"
                            
                        >验证码</InputItem>
                        <Button type="warning">获取验证码</Button>
                        </label>
                        
                        <label htmlFor="">
                        <WhiteSpace/>
                            <Button type="primary">登录</Button>
                        </label>
                    </List>    
                </WingBlank>       
            </div>
        )
    }
}
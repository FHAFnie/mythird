

import "./index.scss";
import React, {Component}  from "react";

import Head from "../../components/head"

import {  WhiteSpace, WingBlank ,Button,Modal,ActionSheet} from 'antd-mobile';

const alert = Modal.alert;
const showAlert = () => {
    const alertInstance = alert('友情提示', '你确定要清空购物车吗???', [
        { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
        { text: '确定', onPress: () => console.log('ok') },
    ]);
    setTimeout(() => {
        // 可以调用close方法以在外部close
        console.log('auto close');
        alertInstance.close();
    }, 500000);
};


const Card = ({title})=>{
    return (
        <div>
            <h2>card-card-card --- {title}</h2>
        </div>
    )
}





export default class My extends Component{

    gotoLogin(){
        let {history} = this.props;
        history.push("/login")
    }

    showActionSheet = () => {
        const BUTTONS = ['拍照', '扫一扫', '计算器', '地理定位', '取消'];
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          destructiveButtonIndex: BUTTONS.length - 2,
          // title: 'title',
          message: '手机操作',
          maskClosable: true,
          'data-seed': 'logId',
          wrapProps:{
            onTouchStart: e => e.preventDefault(),
          }
        },
        (buttonIndex) => {
            
        });
      }

    render(){   
        return (
            <div className="box">
                <Head title="我"></Head>        
                <WingBlank>
                    <WhiteSpace />
                    <Button type="primary" onClick={()=>this.gotoLogin() }>登录</Button><WhiteSpace />
                    <Button onClick={showAlert} >警告弹框 </Button><WhiteSpace />
                    <Button onClick={this.showActionSheet} type="primary">actionsheet</Button><WhiteSpace />
                    <Button type="primary" disabled>primary disabled</Button><WhiteSpace />
                    <Button type="warning">warning</Button><WhiteSpace />
                    <Button type="warning" disabled>warning disabled</Button><WhiteSpace />
                    <Button loading>loading button</Button><WhiteSpace />
                    <Button icon="check-circle-o">with icon</Button><WhiteSpace />
                    <Card title="hello 1807"></Card>
                </WingBlank>

            </div>
        )
    }
}
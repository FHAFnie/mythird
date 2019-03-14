

import "./index.scss";
import React, {Component}  from "react";

import  axios from "axios";
import {Card,WhiteSpace,Tabs,WingBlank} from "antd-mobile";
import {Link} from "react-router-dom"
import Head from "../../components/head"
export default class GoodDetail extends Component{


    state = {
        refreshing:false  // 没有在刷新 
    }

    componentWillMount(){
        
    }

    render(){
        let {match,location} = this.props;
        return (
           <div className="box">
                 <Head title={match.params.id } show={true} history={this.props.history}></Head>
                 <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card>
                    <Card.Header
                        title="走秀网"
                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                        extra={<span>点击评论</span>}
                    />
                    <Card.Body>
                        <p>{new URLSearchParams(location.search).get("name")}</p>
                        <img  style={{width:'100%',height:300}} src={new URLSearchParams(location.search).get("img")} alt=""/>
                    </Card.Body>
                    <Card.Footer content="点赞" extra={<div>收藏</div>} />
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>
           </div>
        )
    }
}
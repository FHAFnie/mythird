

import "./index.scss";
import React, {Component}  from "react";

import Head from "../../components/head"
import { SearchBar, WhiteSpace, WingBlank } from 'antd-mobile';
export default class SearchDemo extends Component{

    render(){
   
        return (
            <div className="box">
                <Head title="搜索商品"  show={true} history={this.props.history}  ></Head>
                <WingBlank>
                    <WhiteSpace/>
                    <SearchBar placeholder="Search" maxLength={8}  />  
                </WingBlank>
                            
            </div>
        )
    }
}
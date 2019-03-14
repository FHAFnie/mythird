

import "./index.scss";
import React, {Component}  from "react";
import Head from "../../components/head"

export default class Car extends Component{

    render(){
   
        return (
            <div className="box">
                <Head title="购物车"></Head>
            </div>
        )
    }
}
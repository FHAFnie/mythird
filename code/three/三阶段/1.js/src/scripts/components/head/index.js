


import "./index.scss";
import React, {Component}  from "react";

import {NavBar,Icon} from "antd-mobile";

export default class Head extends Component{

    gotoSearch=()=>{
        const {history} = this.props;
        history.push("/search/");
    }

    render(){
        const {title,show,history} = this.props;
        return (
            <NavBar
                mode="light"
                icon={show?<Icon type="left" />:''}
                onLeftClick={show?()=>history.go(-1):() => console.log('')}
                rightContent={[
                    <Icon onClick={this.gotoSearch}  key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}
                >
                    {title}
                </NavBar>
        )
    }
}
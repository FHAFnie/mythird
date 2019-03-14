

import "./index.scss";
import React, {Component}  from "react";

import SwiperDemo from "../../components/swiper"

export default class Guide extends Component{

    state = {
        imgs:[
            require("../../../assets/images/slide1.png"),
            require("../../../assets/images/slide2.png"),
            require("../../../assets/images/slide3.png"),
            require("../../../assets/images/slide4.png"),
        ]
    }

    gotoApp=(index)=>{
        let {history} = this.props;
        if(index==this.state.imgs.length-1){
            history.push("/app/")
        }
    }

    componentWillMount(){
        let {history} = this.props;
        if(localStorage.visitCount){
            if(localStorage.visitCount>=3){
                localStorage.visitCount++;
                history.push("/app/")
            }else{
                localStorage.visitCount++;
            }
        }else{
            localStorage.visitCount = 1;
        }
    }

    render(){
        let images = this.state.imgs.map((img,index)=>{
            return (
                <img onClick={()=>this.gotoApp(index)} className='img' key={index} src={img} alt=""/>
            )
        })
        return (
            <div className="box">
                <SwiperDemo id="guide" swiperOptions={{speed:1200}}>
                    {images}
                </SwiperDemo>
            </div>
        )
    }
}

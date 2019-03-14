

import  React, {Component} from "react";

import "../utils/swiper/swiper-3.3.1.min.js";
// import "../utils/swiper/swiper-3.3.1.min.css";  导入 error


export default class SwiperDemo extends Component{
    render(){

        let {id,swiperOptions} = this.props;
        return (
            <div className="swiper-container" id={id} >
                <div className="swiper-wrapper">
                    {
                        this.props.children.map((child,index)=>{
                            return (
                                <div className="swiper-slide" key={index}>
                                    {child}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    componentDidMount(){
        // 判断当前 children 是否为空
        let {id,swiperOptions} = this.props;
        if(this.props.children.length>0){
            new Swiper("#"+id,swiperOptions)
        }
    }

    componentDidUpdate(){

        let {id,swiperOptions} = this.props;
        if(this.props.children.length>0){
            new Swiper("#"+id,swiperOptions)
        }
    }
}

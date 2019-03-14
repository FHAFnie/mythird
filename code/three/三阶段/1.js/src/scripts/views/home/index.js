

import "./index.scss";
import React, {Component}  from "react";

import Head from "../../components/head"

import axios from "axios";

import {Toast,WingBlank,Carousel,Accordion,List} from "antd-mobile"
import {Link} from "react-router-dom"
import store from "../../store";
import { getBanner } from "../../actions";
import {connect} from "react-redux";

@connect(
    state=>{
        return {
            banner:state.banner
        }
    }
)
export default class Home extends Component{

    // state = {
    //     banner:[]
    // }

    componentWillMount(){

        let {dispatch} = this.props;
        Toast.loading('加载中...', 1, () => {
            console.log('Load complete !!!');
        });
        setTimeout(()=>{
            dispatch(getBanner({
                url:"/vue/getgoods",
                limit:6,
                cb:()=>{
                    Toast.hide();
                }
            }))
        },1000)

        
        // axios.get("http://localhost:3100/vue/getgoods",{
        //     params:{
        //         limit:5
        //     }
        // }).then(res=>{
        //    console.log(res); 
        //    setTimeout(()=>{
        //         this.setState({
        //             banner:res.data.result
        //         })
        //         Toast.hide();
        //    },1000)
        // })
    }

    render(){
        // let {banner:{banner}} = store.getState();
        let {banner:{banner}} = this.props;
        console.log(this.props);  //  { banner:[] }
        return (
            <div className="box">
                <Head title="首页" show={true} history={this.props.history}></Head>
                <WingBlank>
                    <Carousel
                    autoplay={true}
                    infinite
                    beforeChange={(from, to) => console.log()}
                    afterChange={index => console.log()}
                    >
                    {banner&&banner.map((val,index) => (
                        <Link
                        key={index}
                        to="/app/home"
                        style={{ width: '100%', verticalAlign: 'top' ,height:300}}
                        >
                        <img
                            src={val.img}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' ,height:300}}
                            onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            }}
                        />
                        </Link>
                    ))}
                    </Carousel>

                    <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                        <Accordion.Panel header="Title 1">
                            <List className="my-list">
                            <List.Item>content 1</List.Item>
                            <List.Item>content 2</List.Item>
                            <List.Item>content 3</List.Item>
                            </List>
                        </Accordion.Panel>
                        <Accordion.Panel header="Title 2" className="pad">this is panel content2 or other</Accordion.Panel>
                        <Accordion.Panel header="Title 3" className="pad">
                            text text text text text text text text text text text text text text text
                        </Accordion.Panel>
                    </Accordion>
                </WingBlank>
                
            </div>
        )
    }
}
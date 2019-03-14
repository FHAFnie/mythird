// pages/my/my.js
import { getRandomColor } from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    percent:0,
    imgUrls: [
      'http://47.94.208.182/base/img/1.jpg',
      'http://47.94.208.182/base/img/2.jpg',
      'http://47.94.208.182/base/img/3.jpg',
      'http://47.94.208.182/base/img/4.jpg',
      'http://47.94.208.182/base/img/5.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    poster:"http://47.94.208.182/base/img/3.jpg",
    name: '此时此刻',
    author: '许巍',
    src:"http://47.94.208.182/mp/Sugar.mp3",
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }],
    videoSrc:"http://47.94.208.182/mp/brkw.mp4",
    txt:""
  },

  gotoPhoto(){
    wx.navigateTo({
      url: '../photo/photo',
    })
  },
  bindInputBlur(e){
    console.log(e);
    this.setData({
      txt:e.detail.value
    })
  },

  bindSendDanmu(){
    this.videoCtx.sendDanmu({
      text:this.data.txt,
      color: getRandomColor()
    })

    this.setData({
      txt:""
    })
  },

  bindButtonTap(){
    const that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success(res) {
        that.setData({
          videoSrc: res.tempFilePath
        })
      }
    })
  },

  audioPlay(){
    this.audioCtx.play()
  },  

  audioPause(){
    this.audioCtx.pause()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var timer = setInterval(()=>{
      this.data.percent++;
      if(this.data.percent<=100){
        this.setData({
          percent: this.data.percent
        })
      }else{
        clearInterval(timer)
        this.setData({
          flag: true
        })
        wx.showToast({
          title: '加载成功...',
          duration:1000
        })
      }
    },10)
  },

  showModal() {
    var that = this;
    wx.showModal({
      title: '警告',
      content: '你正在使用4G 流量观看视频 ',
      cancelText: "取消观看",
      cancelColor: "#333",
      confirmText: "继续观看",
      confirmColor: "#a375ce",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: `土豪请继续`,
            duration: 1000
          })
          wx.setStorageSync('playType', true);
          that.videoCtx.play();
        } else if (res.cancel) {
          wx.showToast({
            title: `请切换WIFI`,
            duration: 1000
          })
          wx.setStorageSync('playType', false)
        }
      }
    })
  },

  videoPlay(){
      // 点击播放  
    if (!wx.getStorageSync('playType')){
      this.videoCtx.pause();
      this.showModal();
    }
  },

  videoplaying(){
    if (!wx.getStorageSync('playType')) {
      this.videoCtx.pause();
      this.showModal();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio');
    this.videoCtx = wx.createVideoContext('myVideo');

    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType;
        console.log(networkType)
        if (networkType !=="wifi"){
          wx.setStorageSync('playType',false )
        }else{
          wx.setStorageSync('playType', true)
        }
      }
    })

    wx.onNetworkStatusChange(function (res) {
        const networkType = res.networkType;
        console.log(networkType)
        if (networkType !== "wifi") {
          wx.setStorageSync('playType', false)
        } else {
          wx.setStorageSync('playType', true)
        }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
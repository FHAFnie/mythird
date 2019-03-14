// pages/my/my.js
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
    duration: 1000
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
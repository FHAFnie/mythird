// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      msg:"hello 武汉1807",
      word:"1807 天道酬勤",
      count:2019,
      flag:true,
      todos:[
        {
          title:"vue",
          msg:"so easy"
        },
        {
          title:"react",
          msg:"太 简单 ..."
        }
      ],
    num: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },

  flagChange(e){
    console.log(e);
    this.setData({
      flag:e.detail.value
    })
  },

  add(){
    this.setData({
      count:++this.data.count
    })
  },


  changeMsg(){
    console.log("xxx")
    this.data.msg = "hello 小程序";
    this.setData({
      msg: "hello 小程序"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    return {
      title: '疯狂买买买-',
      path: '/page/home/home'
    }
  }
})
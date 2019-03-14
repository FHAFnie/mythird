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
    num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    usersInfo: { username: 'zuozuomu', password: 'adc123'},
    modalData:{
      modalHidden:true,
      username:'xxx',
      password:""
    },
    actionsheetData:{
      actionsheetHidden:true,
      items:["办理护照","办理签证",'办理移民',"暂停办理"]
    }
  },

  showModal(){
    wx.showModal({
      title: '警告',
      content: '你正在使用4G 流量观看视频 ',
      cancelText:"取消观看",
      cancelColor:"#333",
      confirmText:"继续观看",
      confirmColor:"#a375ce",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: `土豪请继续`,
            duration: 1000
          })
        } else if (res.cancel) {
          wx.showToast({
            title: `请切换WIFI`,
            duration: 1000
          })
        }
      }
    })
  },

  showAction(){
    var that = this;
    wx.showActionSheet({
      itemList: this.data.actionsheetData.items,
      success(res) {
        console.log(res.tapIndex)
        wx.showToast({
          title: `${that.data.actionsheetData.items[res.tapIndex]} success`,
          duration: 1000
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  open(){
    this.setData({
      'actionsheetData.actionsheetHidden': false
    })

  },

  itemTap(e){
    console.log(e);
    wx.showToast({
      title:  `${e.target.dataset.item} 成功`,
      duration:1000
    })
    this.setData({
      'actionsheetData.actionsheetHidden': true
    })
  },

  actionsheetcancel(){
    this.setData({
      'actionsheetData.actionsheetHidden': true
    })
  },


  confirm(){
    this.setData({
      'modalData.modalHidden': true
    })

    wx.setStorageSync('username', this.data.modalData.username)
    wx.setStorageSync('password', this.data.modalData.password)
    

  },
  cancel(){
    this.setData({
      'modalData.modalHidden': true
    })


  },
  getUsername(e){
    
    this.setData({
      'modalData.username':e.detail.value
    })
  },
  getPassword(e){
    this.setData({
      'modalData.password': e.detail.value
    })
  },

  tapName(e){
    console.log(e);
  },
  parent(){
    console.log("我是 属于 父元素的事件 。。。")
  },

  childOne(e){
    console.log("这是一个冒泡事件 ")
  },
  childTwo(e) {
    console.log("这不是一个冒泡事件  阻止事件冒泡")
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
    if (wx.getStorageSync('username') && wx.getStorageSync('password')){
      this.setData({
        'modalData.modalHidden': true
      })
    }else{
      this.setData({
        'modalData.modalHidden': false
      })
    }
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
// pages/shoppcar/shoppcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      carList:[],
      total:0,
      quan:false,
  },

  checkAll(e){
    var quan = e.target.value;
    console.log(e);

    this.setData({
        quan:!this.data.quan
    })

    var carList = this.data.carList.map((item)=>{
      item.checked = this.data.quan
      return item;
    })

    this.setData({
      carList
    })

    
  },

  checkOne(e){
    var goodId = e.target.dataset.goodid;
  
    var carList = this.data.carList.map((item)=>{
     
      if(item.goodsId==goodId){
        console.log("xxxxx");
        item.checked = !item.checked;
      }
      return item;
    })
  console.log(carList)
    var total = 0;
    var quan = true;
    carList.forEach((item)=>{
      if(item.checked){
        total += item.price*item.count *1;
      }else{
        quan = false;
      }

    
    })
    this.setData({
      carList,
      total,
      quan
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
    if(wx.getStorageSync('username')){
     wx.request({
       url: 'http://47.94.208.182:3100/react/getCarList',
       data:{
         mobile:wx.getStorageSync('username')
       },
       success:(res)=>{
         var carList = res.data.result.map((item)=>{
           item.checked = false;
           return item;
         })
         this.setData({
           carList
         })
         wx.showToast({
           title: '请求成功!',
         })
       }
     })
    }else{
      wx.showModal({
          title: '提示',
          content: '还未登录,请前往首页登录 ！ ',
          cancelText: "我不登录",
          cancelColor: "#333",
          confirmText: "马上登录",
          confirmColor: "#a375ce",
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.switchTab({
                url: '../home/home',
              })
            } else if (res.cancel) {
             
            }
          }
        })
    }
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
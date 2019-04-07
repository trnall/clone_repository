// mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   userInfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     console.log(app.globalData);
    var userInfo = app.globalData.userInfo;
    console.log(userInfo);
    that.setData({
      userInfo:userInfo
    })
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
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
    console.log('1234565');
    this.onLoad();
    wx.stopPullDownRefresh();
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
  
  },
  //我的简历
  myJianli:function(){
    wx.navigateTo({
      url: '../jianli/jianli',
    })
  },
  //联系我们
  contactUs:function(){
    wx.navigateTo({
      url: '../contact/contact',
    })
  },
  //申请记录
  myRecord:function(){
      wx.navigateTo({
          url: '../record/record',
      })
  },
  //我的钱包
  myWallet: function () {
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  }
})
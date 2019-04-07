// recommenddetail.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList : [],
    imgUrl: app.globalData.globalImg
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var recomId = options.id;
    console.log(recomId);

    wx.request({
      url: `${app.globalData.globalUrl}/mobile/article/enterpriseInfo`,
      method:'GET',
      data:{
        cat_id:recomId
      },
      success:function(data){
        //console.log(data.data.list.cat_name);
        var goodsContent = data.data.list.content;
        WxParse.wxParse('goodsContent', 'html', goodsContent, that, 5);
        that.setData({
          goodsList : data.data.list
        })
      }
    })
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
    //console.log('1234565');
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
  
  }
})
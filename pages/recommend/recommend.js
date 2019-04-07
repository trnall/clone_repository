// recommend.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recomList:[],
    imgUrl: app.globalData.globalImg
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: `${app.globalData.globalUrl}/mobile/article/enterprise`,
      method:'GET',
      data:{
        is_open:1
      },
      success:function(data){
        console.log(data);
        that.setData({
          recomList:data.data.list
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
   * 监听用户下拉刷新
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
  
  },
  recommendDetail:function(e){
    var id = e.currentTarget.dataset.id;
    //console.log(id);
    wx.navigateTo({
      url: '../recommendDetail/recommenddetail?id='+id,
    })
  }
})
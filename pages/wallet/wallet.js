// wallet.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: null,
    alert: true,
    tx_money: null,
    flag: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user_id = wx.getStorageSync('userId');
    wx.request({
      url: `${app.globalData.globalUrl}/Mobile/job/my_wallet`,
      data: {
        user_id: user_id
      },
      success: function (res) {
        console.log(res.data.result)
        that.setData({
          money: res.data.result
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
  //跳转明细页面
  mingxi: function () {
    wx.navigateTo({
      url: '../mingxi/mingxi',
    })
  },
  //提现操作
  tixian: function (e) {
    this.setData({
      alert: false,
    })
  },
  //关闭提现弹框
  close: function (e) {
    this.setData({
      alert: true
    })
    wx.showToast({
      title: '您已取消提现',
    })
  },
  //输入框金额
  tx_money: function (e) {
    console.log(e.detail.value);
    var tx_money = parseFloat(e.detail.value);
    console.log(tx_money);
    this.setData({
      tx_money: tx_money,
    })
  },
  //确认提现操作
  sure_btn: function (e) {
    console.log(this.data.tx_money);
    var that = this;
    var tx_money = this.data.tx_money;
    var money = this.data.money;
    var user_id = wx.getStorageSync('userId');
    if (tx_money > money) {
      wx.showToast({
        title: "提现金额不能大于余额"
      })
    } else if (!tx_money) {
      wx.showToast({
        title: "请输入正确的提现金额"
      })
    } else {
      var flag = that.data.flag;
      if (flag) {
        that.setData({
          flag: false,  
        });
        console.log('连续点击，二次提现')
        wx.request({
          url: `${app.globalData.globalUrl}/Mobile/Cart/qiyeFuMoney`,
          data: {
            user_id: user_id,
            money: tx_money,
          },
          success: function (res) {
            console.log(res);
            that.setData({
              alert: true,
            });
            wx.showToast({
              title: res.data.msg,
            })
            that.onLoad();
            that.setData({
              flag:true,
            })
          }
        })
      }

    }
  }
})
// contact.js
Page({

  /**
   * 页面的初始数据
   */
    data: {
        scale:16,
        markers: [{
        iconPath: "../img/weizhi.png",
        id: 0,
        latitude: 34.795110,
        longitude: 113.570300,
        // latitude: '',
        // longitude: '',
        width: 32,
        height: 32
        }],
    //   controls: [{
    //     id: 1,
    //     iconPath: '../img/weizhi.png',
    //     position: {
    //       left: 0,
    //       top: 300 - 50,
    //       width: 32,
    //       height: 32
    //     },
    //     clickable: true
    //   }]
        controls: [
            {
                id: 1,
                iconPath: '../img/minus.png',
                position: {
                    left: 250,
                    top: 205,
                    width: 32,
                    height: 32
                },
                clickable: true
            },
            {
                id: 2,
                iconPath: '../img/add.png',
                position: {
                    left: 290,
                    top: 205,
                    width: 32,
                    height: 32
                },
                clickable: true
            }
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {

            }
        })

    },

    //点击缩放按钮动态请求数据
    controltap(e) {
        var that = this;
        //console.log("scale===" + this.data.scale)
        if (e.controlId === 1) {
        // if (this.data.scale === 13) {
        that.setData({
            scale: --this.data.scale
        })
        // }
        } else {
        //  if (this.data.scale !== 13) {
        that.setData({
            scale: ++this.data.scale
        })
        // }
        }
    },
    regionchange(e) {
        console.log(e.type)
    },
    markertap(e) {
        console.log(e.markerId)
    },
    // controltap(e) {
    //   console.log(e.controlId)
    // },

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
    callPhone:function(e){
        var phoneNum = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
        phoneNumber: phoneNum,
        })
    }
})
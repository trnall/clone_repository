// work.js
var app = getApp();
var loadMore = function (that) {
  var page = that.data.page + 1;
  var lat = app.globalData.lat;
  var lng = app.globalData.lng;
  var keywords = that.data.keywords
  that.setData({
    text: "正在加载",
  })
  wx.request({
    url: `${app.globalData.globalUrl}/mobile/job/job_list`,
    method: 'GET',
    data: {
      keywords: keywords,
      pcurr: page,
    },
    success: function (data) {
      console.log(page)
      if (data.data.status == 403) {
        wx.showToast({
          title: '没有更多数据了',
        });
        that.setData({
          text: "没有更多数据了"
        })
        return false;
      }
      console.log(data);
      var recomList = that.data.searchList;
      var list = recomList.concat(data.data.result);
      that.setData({
        searchList: list,
        page: page
      })
    },
    error: function (data) {
      console.log(data);
    }
  });
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchList:[],
        page:1,
        text:"上拉加载更多",
        keywords:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var search = options.searchs;
        that.setData({
          keywords: search,
          searchList: [],
          page: 1,
          text: "上拉加载更多",
        })
        var page = that.data.page;
        console.log('搜索内容为：' + page);
        wx.request({
          url: `${app.globalData.globalUrl}/mobile/job/job_list`,
            method:'GET',
            data:{
                keywords: search,
                pcurr:1
            },
            success:function(data){
                console.log(data);
                console.log('dddddddddd');
                if(data.data.result == '' || data.data.result == null || data.data.result == undefined){
                    wx.showToast({
                        title: data.data.msg,
                    })
                }else{
                    that.setData({
                        searchList:data.data.result,
                    })
                }
                var list = that.data.searchList;
                if (list.length < 5) {
                  that.setData({
                    text: "没有更多数据了"
                  })
                }
            }
           
        })
    },
    //下拉刷新
    onPullDownRefresh: function () {
        console.log('1234565');
        //this.onLoad();
        wx.stopPullDownRefresh();
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
    // onPullDownRefresh: function () {
    
    // },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      var that = this;
      var list = that.data.searchList;
      if (list.length >= 5) {
        loadMore(that);
      }
      
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    
    },
    //打电话
    call: function (e) {
        var phone = e.currentTarget.dataset.tel;
        wx.makePhoneCall({
        phoneNumber: phone,
        })
    },
    //点击职位进入详情
    workDetail: function (e) {
        var id = e.currentTarget.dataset.id;
        //console.log(id);
        wx.navigateTo({
            url: '../workDetail/workdetail?id=' + id,
        })
    }
})
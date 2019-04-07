// work.js
var app = getApp();
var loadMore = function (that) {
  var data = that.data.canshu;
  data.pcurr = that.data.page + 1;
  console.log(data);
  that.setData({
    text: "正在加载",
  })
  wx.request({
    url: `${app.globalData.globalUrl}/mobile/job/job_list`,
    method: 'GET',
    data: data,
    success: function (res) {
      console.log('dddddddddddddddddddddddddddddd');
      console.log(res)
      console.log(res.data.result);
      if (res.data.status == 403) {
        wx.showToast({
          title: '没有更多数据了',
        });
        that.setData({
          text: "没有更多数据了"
        })
        return false;
      }
      var workList = []
      if (!res.data.result) {
        workList = [];
        wx.showToast({
          title: '暂时没有符合条件内容',
        })
      } else {
        var list = that.data.workList;
        workList = list.concat(res.data.result);
      };
      console.log(workList);
      that.setData({
        workList: workList,
        page: data.pcurr
      })
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workList: [],
    wrap1: true,
    wrap2: true,
    wrap3: true,
    wrap: true,
    typeList: [],
    index: null,
    text:"上拉加载更多",
    page:1,
    canshu:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      page: 1,
      text: '上拉加载更多',
      workList: [],
      wrap1: true,
      wrap2: true,
      wrap3: true,
      wrap: true,
      typeList: [],
      index: null,
      text: "上拉加载更多",
      page: 1,
      canshu: {},
    })
    //获取本地存储城市ID
    var cityList = wx.getStorageSync('city');
    var cityCode = cityList.provinceCode;
    console.log(cityList);
    if (cityCode == '' || cityCode == null || cityCode == undefined) {
      cityCode = 21387;
    }
    var that = this;

    wx.request({
      url: `${app.globalData.globalUrl}/Mobile/job/job_list`,
      method: 'GET',
      data: {
        pcurr:1
      },
      success: function (data) {
        console.log('dddddddddddddddddddddddddddddd')
        console.log(data);
        that.setData({
          workList: data.data.result
        })
        var list = that.data.workList;
        console.log(list.length);
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
    this.onLoad();
    wx.stopPullDownRefresh();
  },
  //上拉加载
  onReachBottom: function () {
    var that = this;
    loadMore(that);
    console.log('111111111111');
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //打电话
  call: function (e) {
    var tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel,
    })
  },
  //点击职位进入详情
  workDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    //console.log(id);
    wx.navigateTo({
      url: '../workDetail/workdetail?id=' + id,
    })
  },
  wrap: function (e) {
    //  console.log('aaaaaa');
    var that = this;
    var index = e.currentTarget.dataset.index;
    var wrap1 = that.data.wrap1;
    var wrap2 = that.data.wrap2;
    var wrap3 = that.data.wrap3;
    that.setData({
      index: index
    })
    if (index == 1) {
      if (wrap1) {
        wrap1 = false;
        // console.log(wrap1);
        this.setData({
          wrap1: wrap1,
          wrap: wrap1,
          wrap2: true,
          wrap3: true
        })
      } else {
        wrap1 = true;
        this.setData({
          wrap1: wrap1,
          wrap: wrap1
        })
      };
      var list = [{id :0,name:"全部"}]
      wx.request({
        url: `${app.globalData.globalUrl}/Mobile/job/get_jobs_type`,
        method: 'GET',
        data: {},
        success: function (data) {
          //console.log('dddddddddddddddddddddddddddddd')
          console.log(data);
          var  typeList = list.concat(data.data.result);
          that.setData({
            typeList: typeList
          })
        }
      })
    } else if (index == 2) {
      if (wrap2) {
        wrap2 = false;
        //console.log(wrap2);
        this.setData({
          wrap2: wrap2,
          wrap: wrap2,
          wrap1: true,
          wrap3: true
        })
      } else {
        wrap2 = true;
        this.setData({
          wrap2: wrap2,
          wrap: wrap2
        })
      };
      var cityList = wx.getStorageSync('city');
      var cityCode = cityList.provinceCode;
      wx.request({
        url: `${app.globalData.globalUrl}/Mobile/job/get_area`,
        method: 'GET',
        data: {
          areaId2: cityCode
        },
        success: function (data) {
          console.log('dddddddddddddddddddddddddddddd');
          console.log(data.data.result);
          that.setData({
            typeList: data.data.result
          })
        }
      })
    } else if (index == 3) {
      //console.log('aaaaaa');
      var that = this;
      var wrap3 = that.data.wrap3;
      // console.log(wrap3);
      if (wrap3) {
        wrap3 = false;
        console.log(wrap3);
        this.setData({
          wrap: wrap3,
          wrap3: wrap3,
          wrap2: true,
          wrap1: true
        })
      } else {
        wrap3 = true;
        this.setData({
          wrap3: wrap3,
          wrap: wrap3,
        })
      };
      that.setData({
        typeList: [
          { id: "is_open", name: "推荐排序" },
          { id: "distance", name: "距离排序" },
          { id: "new", name: "时间排序" },
          { id: "money", name: "价格排序" },
        ]
      })
    }
    // console.log(that.data.wrap1 + '||' + that.data.wrap2 + "||" + that.data.wrap3 + "||"+that.data.wrap)
  },
  getList: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = that.data.index;
    var list = that.data.workList;
    if (list.length <5) {
      that.setData({
        text: "没有更多数据了"
      })
    }else{
      that.setData({
        text: "上拉加载更多"
      })
    }
    that.setData({
      wrap : true,
      page :1,
    })
    var data = {}
    if (index == 1) {
      data = {
        job_type: id
      };
      that.setData({
        wrap1: true
      })
    } else if (index == 2) {
      data = {
        areaId3: id,
      };
      that.setData({
        wrap2: true
      })
    } else if (index == 3){
      var lat = app.globalData.lat;
      var lng = app.globalData.lng;
      console.log(lat);
      data = {
        sort: id,
        lat:lat,
        lng:lng,
      };
      that.setData({
        wrap3: true
      })
    }
    that.setData({
      canshu:data,
    })
    wx.request({
      url: `${app.globalData.globalUrl}/mobile/job/job_list`,
      method: 'GET',
      data: data,
      success: function (res) {
        console.log('dddddddddddddddddddddddddddddd');
        console.log(res)
        console.log(res.data.result);
        var workList =[]
        if (! res.data.result){
          workList= [];
          wx.showToast({
            title: '暂时没有符合条件内容',
          })
        } else{
          workList= res.data.result
        };
        console.log(workList);
        that.setData({
          workList: workList,
        })
      }
    });
    var list = that.data.workList;
    if (list.length <= 5) {
      that.setData({
        text: "没有更多数据了"
      })
    }
  }
})
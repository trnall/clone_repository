//index.js
//获取应用实例
var app = getApp();
var login = require('../../utils/util.js');
var cityList = wx.getStorageSync('city');
console.log('城市存储为：' + cityList.provinceCode);
var cityName = cityList.cityName;
var cityCode = cityList.provinceCode;
var loadMore = function (that) {
  var page = that.data.page + 1;
  that.setData({
    text:"正在加载",
  })
  wx.request({
    url: `${app.globalData.globalUrl}/mobile/job/job_list`,
    method: 'GET',
    data: {
      areaId2: cityCode,
      pcurr: page,
      sort: "is_open"
    },
    success: function (data) {
      // console.log(areaId2);
      // console.log(pcurr);
      // console.log(sort);
      if (data.data.status == 403 ){
        wx.showToast({
          title: '没有更多数据了',
        });
        that.setData({
          text:"没有更多数据了"
        })
        return false;
      }
      console.log(data);
      var recomList = that.data.recomList;
      var list = recomList.concat(data.data.result);
      that.setData({
        recomList: list,
        page: page
      })
    },
    error: function (data) {
      console.log(data);
     
    }
  });
}
Page({
    data: {
        motto:'Hello World',
        userInfo:{},
        recomList:[],
        swiperDian:true,
        swiperAuto:true,
        swiperInterval:3000,
        imgUrl:app.globalData.globalImg,
        banList:[],
        searchContent:'',
        city:"",
        cityCode:'',
        top:0,
        cityInfo:null,
        page :1,
        text:'上拉加载更多',
        noticeList:[],
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        console.log('onLoad');
        //this.onLoad();
        var that = this;
        var page = this.data.page;
        // var userInfo = wx.getStorageSync('userinfo');
        console.log('本地缓存为：' + page);
        console.log(wx.getStorageSync('userinfo'));
        that.setData({
          page:1,
          text:'上拉加载更多'
        })
        var cityCode = ''
        //获取当前位置
        // wx.getLocation({
        //   async:false,
        //   success: function(res) {
        //     console.log(res);
        //     console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
        //     app.globalData.lat = res.latitude;
        //     app.globalData.lng = res.longitude;
        //     // getApp().setGlobalData({
        //     //   lat: res.latitude,
        //     //   lng: res.longitude,
        //     // })
        //     wx.request({
        //       url: `${app.globalData.globalUrl}/Mobile/job/get_current_city`,
        //       data: {
        //         lat: res.latitude,
        //         lng: res.longitude,
             
        //       },
              
        //       method: "GET",
        //       success: function (res) {
        //         console.log(res.data);
        //         var cityInfo = {
        //           cityName: res.data.result.cityName,
        //           provinceCode: res.data.result.areaId2,
        //         }
        //         that.setData({
        //           cityInfo: cityInfo
        //         });

        //         //本地存储用户选择的城市
        //         wx.setStorageSync("city", cityInfo);
        //       },
        //       error: function (data) {
        //         console.log(data);
        //       }
        //     });
        //   },
        // })
        var city = wx.getStorageSync("city");
        var cityName= city.cityName;
        cityCode = city.provinceCode;
        console.log('44444444');
        console.log(city);
        //获取本地存储城市
        if(cityCode == '' || cityCode == null || cityCode == undefined){
            cityCode = 21387;
        }
        
        if (cityName == '' || cityName == null || cityName == undefined){
            that.setData({
                city: "郑州市"
            })
        }else{
           that.setData({
               city: cityName,
               cityCode:cityCode
            }) 
        };
        console.log('城市为：' + cityName);
        
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            })
        });

        //轮播
        wx.request({
            url: `${app.globalData.globalUrl}/mobile/article/imgInfo`,
            data:{},
            method:"GET",
            success:function(res){
                //console.log('轮播数据为：' + res.data.list[0].ad_code);
                that.setData({
                    banList:res.data.list
                })
            },
            error:function(data){
                console.log(data);
            }

        });
        wx.request({
          url: `${app.globalData.globalUrl}/mobile/article/news`,
          method: 'GET',
          data: {},
          success: function (res) {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            console.log(res.data.result);
            that.setData({
              noticeList: res.data.result
            })
          }
        })

        //职位推荐数据
        wx.request({
          url: `${app.globalData.globalUrl}/mobile/job/job_list`,
            method:'GET',
            data:{
              areaId2: that.data.cityCode,
              pcurr : 1,
              sort: "is_open"
            },
            success:function(data){
              console.log(cityCode);
                console.log(data);
                that.setData({
                    recomList:data.data.result
                })
            },
           error:function(data){
             console.log(data)
           }
        });
    },
    //下拉刷新
    onPullDownRefresh: function () {
        console.log('1234565');
        this.onLoad();
        wx.stopPullDownRefresh();
    },
    //上拉加载
    onReachBottom:function(){
      var that = this;
      // wx.showToast({
      //   title: '上拉加载',
      // })
      loadMore(that);

     
    },

    //点击九宫格跳转
    workList:function(e){
        var title = e.currentTarget.dataset.text;
        console.log(title);
        wx.navigateTo({
            url: '../work/work',
        })
    },
    // 全部工作
    all:function(e){
      wx.navigateTo({
          url: '../work/work',
        })
    },
    //商家合作
    pater: function (e) {
      wx.navigateTo({
        url: '../pater/pater',
      })
    },
    //附近工作
    fujin: function (e) {
      wx.navigateTo({
        url: '../fujin/fujin',
      })
    },
    //点击职位进入详情
    workDetail:function(e){
        var id = e.currentTarget.dataset.id;
        console.log('fffffffffffffffffffffffffffffffffff');
        console.log(id);
            wx.navigateTo({
                url: '../workDetail/workdetail?id='+id,
        })
    }, 
    //打电话
    call:function(e){
        var tel = e.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: tel,
        })
    },
    //点击进入个人中心
    myInfo:function(){
        wx.switchTab({
            url: '../mine/mine',
        })
    },
    //公告
    notice:function(){
        wx.navigateTo({
            url: '../notice/notice',
            // url: '../tabs/tabs',
        })
    },
    searchContent:function(e){
        console.log(e.detail.value);
        this.setData({
            searchContent:e.detail.value
        })
    },
    //搜索
    search:function(){
        var searchContents = this.data.searchContent;
        console.log(searchContents);
        wx.navigateTo({
            url: '../search/search?searchs='+searchContents,
        })
    },
    //切换城市
    chooseCity:function(e){
        wx.navigateTo({
            url: '../switchcity/switchcity',
        })
    },
    //分享
    onShareAppMessage: function () {
        console.log('分享成功');
    },
})

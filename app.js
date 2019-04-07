//app.js
var app = getApp();
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        var that = this;
        wx.login({
            success: function (res) {
                //console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbb')
                if (res.code) {
                    var code = res.code + '';
                    wx.getUserInfo({
                        success: function (res) {
                            var data = {
                                code: code,
                                nickname: res.userInfo.nickName,
                                head: res.userInfo.avatarUrl,
                                sex: res.userInfo.gender
                            };
                            console.log(data);
                            that.globalData.userInfo = data;
                             console.log(that.globalData.userInfo);
                            wx.request({
                              url: 'https://jh.dasouwang.cn/Mobile/User/wxLogin',
                                data: data,
                                method: 'GET',
                                success: function (res) {
                                    console.log('aaaaaaaa')
                                    console.log(res.data);
                                    var user_id = res.data.user_id;
                                    wx.setStorageSync('userId', user_id);
                                    //that.globalData.user_id = user_id;
                                    //console.log(that.globalData.user_id);
                                }
                            });
                        }
                    });
                }
            }
        })
        wx.getLocation({
          async: false,
          success: function (res) {
            console.log(res);
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
            console.log(that);
            console.log(getApp());
            that.globalData.lat = res.latitude;
            that.globalData.lng = res.longitude;
            // that.setGlobalData({
            //   lat: res.latitude,
            //   lng: res.longitude,
            // })
            wx.request({
              url: `https://jh.dasouwang.cn/Mobile/job/get_current_city`,
              data: {
                lat: res.latitude,
                lng: res.longitude,
              },

              method: "GET",
              success: function (res) {
                console.log(res.data);
                var cityInfo = {
                  cityName: res.data.result.cityName,
                  provinceCode: res.data.result.areaId2,
                }
                that.globalData.cityInfo=cityInfo;
                //本地存储用户选择的城市
                wx.setStorageSync("city", cityInfo);
              },
              error: function (data) {
                console.log(data);
              }
            });
          },
        })
    },

    getUserInfo: function(cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            var that = this;
            wx.getUserInfo({
                withCredentials: false,
                success: function(res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },

    globalData: {
        userInfo: null,
        globalUrl:'https://jh.dasouwang.cn',
        globalImg:'https://jh.dasouwang.cn',
        lat:'',
        lng:'',
        show:true,
    }
})

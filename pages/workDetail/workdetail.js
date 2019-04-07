// workdetail.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        infoList:[],
        globalImgUrl:app.globalData.globalImg,
        show:true,
        signed:null,
        job_id:null,
        userIds:null,
        baoming:"报名"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = null;
        var that = this;
        var show = app.globalData.show;
        that.setData({
          show:show,
        })
        if(options){
          id = options.id;
        }else{
          id = this.data.job_id;
        }
        this.setData({
          job_id : id,
        })
        console.log(this.data.job_id)
        console.log(id);
        var that = this;
        //获取本地存储用户ID
        var userId = wx.getStorageSync('userId');
        console.log('本地存储用户ID为：'+userId);
        //拿到用户ID
        that.setData({
            userIds: userId,
            job_id:id,
        })
        
        wx.request({
          url: `${app.globalData.globalUrl}/mobile/job/job_detail`,
            method:'GET',
            data:{
              job_id:id,
              user_id: userId,
            },
            success:function(res){
                console.log(res);
                that.setData({
                  job_id: id,
                })
                var infoContent = res.data.result.des;
                //console.log(infoContent);
               // var gsInfoContent = obj.data.list[0].work_name.content;
                WxParse.wxParse('infoContent', 'html', infoContent, that, 5);
               // WxParse.wxParse('gsInfoContent', 'html', gsInfoContent, that, 5);
                //console.log('1111111111111111111111111111');
                //console.log(infoContent);
                that.setData({
                  infoList: res.data.result,
                  signed: res.data.result.status,
                });
                var status = that.data.signed;
                if (status == "报名") {
                  that.setData({
                    baoming: "报名"
                  });
                } else {
                  that.setData({
                    baoming: "已报名",
                  });
                };
            },
            error:function(res){
              console.log(res);
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
    // 点击关闭弹框
    close:function(){
      this.setData({
        show:true
      })
    },
    wsjl:function(){
      wx.navigateTo({
         url: '../jianli/jianli',
     })
    },
    changeData:function(show){
        this.setData({
          show:show,
        })
    },
    //打电话
    call: function (e) {
      var tel = e.currentTarget.dataset.tel;
      wx.makePhoneCall({
        phoneNumber: tel,
      })
    },
    signUp:function(e){
        var job_id = e.currentTarget.dataset.id;
        //this.setData.userIds = userId;
        //获取本地存储用户ID
        var that = this;
        var userId = wx.getStorageSync('userId');
        //console.log('本地存储用户ID为：' + userId);
        //var userFirst = wx.getStorageSync('userFirst');
        //console.log('是否为第一次进入:'+userFirst);
        console.log('文章ID为：' + job_id + '用户ID为：' + userId);

        wx.request({
          url: `${app.globalData.globalUrl}/Mobile/job/sign`,
          method: 'GET',
          data: {
            job_id: job_id,
            user_id: userId,
          },
          success: function (data) {
            console.log(data);
            if(data.data.status == 200){
              wx.showToast({
                title: '申请成功',
              })
              that.onLoad();
            } else if (data.data.status == 300){
                that.setData({
                  show:false,
                })
            }else if(data.data.status == 201){
              wx.showToast({
                title: '已报名',
              })
            }
          }
        })
    }
})
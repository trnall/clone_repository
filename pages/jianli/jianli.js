// jianli.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dateValue: '',
        userName : '',
        userSex : null,
        userBirth : '',
        userTel : '',
        userAddress : '',
        openId:'',
        isLogin:true,
        userList:[],
        isBoy:'',
        isGirl:'',
        height:'',
        school:'',
        grade:'大一',
        gradeIndex: 0,
        grade1: ['大一', '大二', '大三', '大四','其他'],
        ceshi:'dayi',
        userInfo:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取本地存储用户ID
      var that = this;
     // var that = this;
      console.log(app.globalData);
      var userInfo = app.globalData.userInfo;
      console.log(userInfo);
      that.setData({
        userInfo: userInfo
      })
        var user_id = wx.getStorageSync('userId');
        //console.log('用户ID为：'+user_id);
        this.setData({
            openId : user_id
        });
        var logs = wx.getStorageSync('logs');
        //获取本地存储是否为第一次填写信息
        var userFirsts = wx.getStorageSync('userFirst');
        //获取本地存储生日信息
        var birth = wx.getStorageSync('birth');
        console.log('获取到的本地存储生日为：' + birth);
        //获取本地存储信息性别
        var sexs = wx.getStorageSync('sex');
        var school = wx.getStorageSync('school');
        var height = wx.getStorageSync('height');
        var grade = wx.getStorageSync('grade');
        that.setData({
          height:height,
          school:school,
        })
        console.log('获取到的本地存储性别为：' + sexs);

        //wx.clearStorageSync();
       
        var openId = that.data.openId;
        //获取用户信息
        // app.getUserInfo(function (userInfo) {
        //     that.setData({
        //         userInfo: userInfo
        //     })
        // });
        //存储生日
        if (birth == '' || birth == null){
            that.setData({
                dateValue: '2006-09-25'
            })
        }else{
            that.setData({
                dateValue:birth
            })
        }
        //存储年级
        if (grade == '' || grade == null) {
          console.log('111111111111');
          that.setData({
            grade: '大一'
          })
        } else {
          that.setData({
            grade: '大一'
          })
        }
        
        //存储性别

        if( sexs == 1 || sexs == ''){
            that.setData({
                isBoy: true
            })
            that.setData({
                isGirl: false
            })
        }else{
            that.setData({
                isBoy: false
            })
            that.setData({
                isGirl: true
            })
        }
        console.log('本地存储为：'+userFirsts);
        //如果已经完善信息进行追加进去
        if (userFirsts === false){

            that.setData({
                isLogin: userFirsts
            })

            //追加简历信息
            wx.request({
              url: `${app.globalData.globalUrl}/Mobile/job/my_resume`,
                method: 'GET',
                data: {
                    user_id: openId
                },
                success: function (data) {
                    console.log('追加简历信息：');
                    console.log(data.data.result);
                    //isLogin = false;
                    that.setData({
                        userList: data.data.result,
                        userName: data.data.result.resume_name,
                        userTel: data.data.result.mobile,
                        userAddress: data.data.result.address,
                        userSex:data.data.result.sex,
                        dateValue: data.data.result.birthday,
                        school: data.data.result.school,
                        height: data.data.result.height,
                        grade: data.data.result.grade,
                    })
                    /*if (userList == '' || userList == undefined || userList == null){
                        console.log('现在是第一次进入');
                    }else{
                        userList: data.data.list
                    }*/
                }
            })
        }else{
            console.log('请填写信息');
        }

        wx.login({
            success:function(res){
                //this.openId = res.code;
                // that.setData({
                //     openId : res.code
                // })
                // console.log('本地存储userID为：' + openId);
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
    chooseImg:function(){
        console.log('123456');
        wx.chooseImage({
            sourceType:['album','camera'],
            success: function(res) {
                console.log(res);
            },
        })
    },
    //选择日期
    datePickerBindchange: function (e) {
        this.setData({
            dateValue: e.detail.value
        })
    },
    //选择年级
    bindPickerChange: function (e) {
      var grade1 = this.data.grade1;
      var grade = grade1[e.detail.value]
      this.setData({
        grade: grade
      })
    }, 
    //获取姓名
    userInput:function(e){
        //console.log(e.detail.value);      
        this.setData({
            userName : e.detail.value
        })
    },
    //获取手机号
    telInput: function (e) {
        //console.log(e.detail.value);
        this.setData({
            userTel: e.detail.value
        })
    },
    //获取居住地
    addressInput: function (e) {
        //console.log(e.detail.value);
        this.setData({
            userAddress: e.detail.value
        })
    },
    //获取性别
    chooseType:function(e){
        //this.userSex = e.detail.value;
        this.setData({
            userSex: e.detail.value
        })
    },
    //获取身高
    heightInput: function (e) {
      //this.userSex = e.detail.value;
      this.setData({
        height: e.detail.value
      })
    },
    //获取学校
    schoolInput: function (e) {
      //this.userSex = e.detail.value;
      this.setData({
        school: e.detail.value
      })
    },
    //获取年级
    gradeInput: function (e) {
      //this.userSex = e.detail.value;
      this.setData({
        grade: e.detail.value
      })
    },
    //保存
    saveInfo:function(e){
        //获取已填写信息
        var userLists = this.data.userList;
        //console.log(userLists);
        // if(userLists == '' || userLists == null || userLists == undefined){
        //     var openId = this.data.openId;
        //     var userName = this.data.userName;
        //     var userTel = this.data.userTel;
        //     var userAddress = this.data.userAddress;
        //     var userBirth = this.data.dateValue;
        //     var userSex = this.data.userSex;
        // }else{
        //     openId = userLists.user_id;
        //     userName = userLists.resume_name;
        //     userTel = userLists.mobile;
        //     userAddress = userLists.address;
        //     userBirth = userLists.birthday;
        //     userSex = userLists.sex;
        // }

        var openId = this.data.openId;
        var userName = this.data.userName;
        var userTel = this.data.userTel;
        var userAddress = this.data.userAddress;
        var userBirth = this.data.dateValue;
        var userSex = this.data.userSex;
        var school = this.data.school;
        var height = this.data.height;
        var grade = this.data.grade;
        
        console.log('用户ID为：' + openId + '姓名为：' + userName + '手机号为：' + userTel + '居住地为：' + userAddress + '出生日期为：' + userBirth + '性别：' + userSex + '年级：' + grade );
        
        /*if (userLists == '' || userLists == null || userLists == undefined) {
            if (userName == '' || userTel == '' || userAddress == '' || userSex == null){
                wx.showToast({
                    title: '信息未填写完整',
                    image: '../img/error.png'
                })
            }else{
                wx.request({
                    url: `${app.globalData.globalUrl}/mobile/user/addResume`,
                    method: 'GET',
                    data: {
                        user_id: openId,
                        resume_name: userName,
                        sex: userSex,
                        birthday: userBirth,
                        mobile: userTel,
                        address: userAddress
                    },
                    success: function (data) {
                        //console.log(data);
                        wx.showToast({
                            title: '保存成功',
                        })
                        wx.navigateBack();
                        var userFirst = false;
                        //console.log(userBirth);
                        //本地存储是否第一次填写信息
                        wx.setStorageSync('userFirst', userFirst);
                        //本地存储生日
                        wx.setStorageSync('birth', userBirth);
                        //本地存储性别信息
                        wx.setStorageSync('sex', userSex);
                        //本地存储用户ID
                        wx.setStorageSync('userId', openId);
                    }
                })
            }
        }else{
            //   wx.showToast({
            //       title: '保存成功',
            //   })
            wx.request({
                url: `${app.globalData.globalUrl}/mobile/user/addResume`,
                method:'GET',
                data:{
                    user_id:openId,
                    resume_name:userName,
                    sex:userSex,
                    birthday:userBirth,
                    mobile:userTel,
                    address:userAddress
                },
                success:function(data){
                    //console.log(data);
                    wx.showToast({
                        title: '保存成功',
                    })
                    wx.navigateBack();
                    var userFirst = false;
                    //console.log(userBirth);
                    //本地存储是否第一次填写信息
                    wx.setStorageSync('userFirst', userFirst);
                    //本地存储生日
                    wx.setStorageSync('birth', userBirth);
                    //本地存储性别信息
                    wx.setStorageSync('sex', userSex);
                    //本地存储用户ID
                    wx.setStorageSync('userId', openId);
                }
            })
        }*/

        if (userName == '' || userTel == '' || userSex == null || height == '' || school == '' || userBirth== ''|| grade == '' ) {
            wx.showToast({
                title: '信息未填写完整',
                image: '../img/error.png'
            })
        } else {
            wx.request({
                url: `${app.globalData.globalUrl}/Mobile/job/edit_resume`,
                method: 'GET',
                data: {
                    user_id: openId,
                    resume_name: userName,
                    sex: userSex,
                    birthday: userBirth,
                    mobile: userTel,
                    height:height,
                    school:school,
                    grade:grade,
                },
                success: function (data) {
                    console.log(data);
                    if(data.data.status == 200){
                      wx.showToast({
                        title: '保存成功',
                      })
                      app.globalData.show = true;
                      var pages = getCurrentPages();
                      console.log(pages.length);
                      if (pages.length > 1) {
                        //上一个页面实例对象
                        var prePage = pages[pages.length - 2];
                        //关键在这里
                        if (prePage.changeData) {
                          prePage.changeData(true);
                        }

                      }
                      // wx.navigateBack();
                      var userFirst = false;
                      console.log(userBirth);
                      //本地存储是否第一次填写信息
                      wx.setStorageSync('userFirst', userFirst);
                      //本地存储生日
                      wx.setStorageSync('birth', userBirth);
                      //本地存储性别信息
                      wx.setStorageSync('sex', userSex);
                      //本地存储用户ID
                      wx.setStorageSync('userId', openId);
                      wx.setStorageSync('school', school);
                      wx.setStorageSync('height', height);
                      wx.setStorageSync('grade', grade);
                    }else{
                      wx.showToast({
                        title: data.data.msg,
                      })
                    }
                   
                }
            })
        }
    }
//   formSubmit: function (e) {
//     var that = this;
//     var formData = e.detail.value;
//     console.log(forData);
//     wx.request({
//       url: `${app.globalData.globalUrl}/mobile/user/addResume`,
//       data: formData,
//       header: {
//         'Content-Type': 'application/json'
//       },
//       success: function (res) {
//         console.log(res.data)
//         that.modalTap();
//       }
//     })
//   }, 
})
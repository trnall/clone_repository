// tabs.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabsActive:'全部',
        tabsList: [
            { tab_name: '全部' },
            { tab_name: '全部1' },
            { tab_name: '全部2' },
            { tab_name: '全部3' },
            { tab_name: '全部4'}
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    
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
    changeTabs:function(e){
        var that = this;
        var tabsName = e.currentTarget.dataset.tab;
        console.log(tabsName);
        var tabsLists = [
            { tab_name: '全部' },
            { tab_name: '全部1' },
            { tab_name: '全部2' },
            { tab_name: '全部3' },
            { tab_name: '全部4' }
        ];
        for (var i = 0; i < tabsLists.length; i++){
            if (tabsName == tabsLists[i].tab_name) {
                that.setData({
                    tabsActive: tabsName
                })
            }
        }
        /*if(tabsName == '全部'){
            that.setData({
                tabsActive: tabsName
            })
        }else if(tabsName == '全部1'){
            that.setData({
                tabsActive: tabsName
            })
        }else if(tabsName == '全部2'){
            that.setData({
                tabsActive: tabsName
            })
        }else if(tabsName == '全部3'){
            that.setData({
                tabsActive: tabsName
            })
        }else{
            that.setData({
                tabsActive: tabsName
            })
        }*/
    }
})
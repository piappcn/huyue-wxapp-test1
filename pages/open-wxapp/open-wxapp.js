// pages/open-wxapp/open-wxapp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   testP:{
     id:1,
     name:'刘家驹'
   }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  openWxApp: function (){

    wx.navigateToMiniProgram({

      appId: 'wxf0ea8a241e932604',
      //打开强的小程序；

      path: 'pages/index/index?id=123456789',

      extarData: {

        open: 'happy'

      },

//需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据
      envVersion: 'release',
     // 要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版） ，仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是体验版或正式版，则打开的小程序必定是正式版。默认值 release

      success(res) {

        // 打开成功 

      },
      fail(){

      },
      complete(){
        
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
  
  }
})
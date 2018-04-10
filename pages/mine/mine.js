var SchoolAdminApi = require('/../../apis/SchoolAdmin.js');
var LoginService = require("/../../services/common/login.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userIcon: '',
    userName: '',
    classList: {},
    subClassList: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var loginParams = {
      successFunc: this.loginSuccess,
    };
    LoginService.checkLogin(loginParams);
  },
  setUserIcon: function(res){
    this.setData({
      userIcon: res.userInfo.avatarUrl,
      userName: res.userInfo.nickName,
    });
  },
  jumpToAddClassPage: function(){
    wx.navigateTo({
      url: './addClass/addClass',
    })
  },
  loginSuccess: function(){
    var inputParams = {
      successFunc: this.getMyClassSuccess,
      failedFunc: this.getMyClassFailed
    };
    wx.getUserInfo({
      lang: 'zh_CN',
      success: this.setUserIcon,
    })
    SchoolAdminApi.getMyAllClass(inputParams);
  },
  getMyClassSuccess: function (data){
    this.setData({
      classList: data.classList,
      bindClassList: data.bindClassList,
    });
  },
  getMyClassFailed: function(){
    wx.showToast({
      title: "网络繁忙，请稍后再试",
      icon: 'none',
      duration: 2000,
      mask: true,
    });
  },
  jumpToClassDetail: function(e){
    var touchClassIndex = e.currentTarget.dataset.idx;
    var classInfo = this.data.classList[touchClassIndex];
    var classUuid = classInfo.classUuid;
    var className = classInfo.className;
    var classNowGrade = classInfo.classNowGrade;
    wx.navigateTo({
      url: '/pages/mine/classDetail/classDetail?classUuid=' + classUuid + '&className=' + className + '&classNowGrade=' + classNowGrade + '&type=1',
    })
  },
  jumpToClassDetailByGuest: function(e){
    var touchClassIndex = e.currentTarget.dataset.idx;
    var classInfo = this.data.classList[touchClassIndex];
    var classUuid = classInfo.classUuid;
    var className = classInfo.className;
    var classNowGrade = classInfo.classNowGrade;
    wx.navigateTo({
      url: '/pages/mine/classDetail/classDetail?classUuid=' + classUuid + '&className=' + className + '&classNowGrade=' + classNowGrade + '&type=2',
    })
  }
})
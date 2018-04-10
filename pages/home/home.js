var SchoolAdminApi = require('/../../apis/SchoolAdmin.js');
var LoginService = require("/../../services/common/login.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  loginSuccess: function () {
    var inputParams = {
      successFunc: this.getMyClassSuccess,
      failedFunc: this.getMyClassFailed
    };
    SchoolAdminApi.getMyAllClass(inputParams);
  },
  getMyClassSuccess: function (data) {
    this.setData({
      classList: data.classList,
      bindClassList: data.bindClassList,
    });
  },
  getMyClassFailed: function () {
    wx.showToast({
      title: "网络繁忙，请稍后再试",
      icon: 'none',
      duration: 2000,
      mask: true,
    });
  },
  navigateToLayoutHomework: function(){
    wx.navigateTo({
      url: './layoutHomework/layoutHomework',
    });
  },
  jumpToTodayClassHomeworkByHost: function(e){
    var touchClassIndex = e.currentTarget.dataset.idx;
    var classInfo = this.data.classList;
    var classUuid = classInfo[touchClassIndex].classUuid;
    var className = classInfo[touchClassIndex].className;
    var classNowGrade = classInfo[touchClassIndex].classNowGrade;
    wx.navigateTo({
      url: '/pages/home/homeworkList/homeworkList?classUuid=' + classUuid + '&className=' + className + '&classGrade=' + classNowGrade + '&type=1',
    });
  },
  jumpToTodayClassHomeworkByGuest: function(e){
    var touchClassIndex = e.currentTarget.dataset.idx;
    var classInfo = this.data.classList;
    var classUuid = classInfo[touchClassIndex].classUuid;
    var className = classInfo[touchClassIndex].className;
    var classNowGrade = classInfo[touchClassIndex].classNowGrade;
    wx.navigateTo({
      url: '/pages/home/homeworkList/homeworkList?classUuid=' + classUuid + '&className=' + className + '&classGrade=' + classNowGrade + '&type=2',
    });
  },
})
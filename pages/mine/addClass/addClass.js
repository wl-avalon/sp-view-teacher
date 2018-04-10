var SchoolAdminApi = require('/../../../apis/SchoolAdmin.js');
var LoginService = require("/../../../services/common/login.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    className: '',
    gradeArray: ['无', '幼儿园小班', '幼儿园中班', '幼儿园大班', '小学一年级', '小学二年级', '小学三年级', '小学四年级', '小学五年级', '小学六年级', '小学七年级', '初一', '初二', '初三', '初四', '高一', '高二', '高三'],
    selectedIndex: 0,
  },
  onLoad: function(options){
    LoginService.checkLogin();
  },
  blurClassname: function(e){
    var className = e.detail.value;
    this.setData({
      className: className,
    });
  },
  addClass: function(){
    var className = this.data.className;
    var selectGrade = this.data.selectedIndex;
    className = className.replace(/^\s+|\s+$/g, "");
    if(className === ''){
      wx.showToast({
        title: "班级名称不能为空",
        icon: 'none',
        duration: 2000,
        mask: true,
      });
      return;
    }
    if (selectGrade === 0){
      wx.showToast({
        title: "当前年级不能为空",
        icon: 'none',
        duration: 2000,
        mask: true,
      });
      return;
    }
    var inputParams = {
      className: className,
      nowGrade: selectGrade,
      successFunc: addClassSuccess,
      failedFunc: addClassFailed,
    };
    SchoolAdminApi.addClass(inputParams);
  },
  bindPickerChange: function(e){
    this.setData({
      selectedIndex: e.detail.value
    })
  }
})

function addClassSuccess(){
  wx.showToast({
    title: "成功",
    icon: 'success',
    duration: 2000,
    mask: true,
    success: function () {
      setTimeout(function () {
        wx.reLaunch({
          url: '/pages/mine/mine',
        });
      }, 2000);
    }
  });
}

function addClassFailed(){
  wx.showToast({
    title: "网络繁忙，请稍后再试",
    icon: 'none',
    duration: 2000,
    mask: true,
  });
}
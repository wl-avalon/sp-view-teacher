var SchoolAdminApi = require('/../../../apis/SchoolAdmin.js');
var LoginService = require("/../../../services/common/login.js");
Page({

  data: {
    classUuid: '',
    className: '',
    classGrade: '',
    selectedIndex: 0,
    subjectArray: ['无', '语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
  },

  onLoad: function (options) {
    LoginService.checkLogin();
    var scene = decodeURIComponent(options.scene);
    
    var requestParams = {
      classUuid: scene,
      successFunc: this.setClassBaseInfo,
    };
    SchoolAdminApi.getClassDetail(requestParams);
    this.setData({
      classUuid: scene,
    });
  },

  setClassBaseInfo: function(data){
    var className  = data.className;
    var classGrade = data.classNowGrade;
    this.setData({
      className: className,
      classGrade: classGrade,
    });
  },

  bindPickerChange: function (e) {
    this.setData({
      selectedIndex: e.detail.value
    })
  },

  bindTeacherAndClass: function(){
    if (this.data.selectedIndex == 0) {
      wx.showToast({
        title: "请选择科目",
        icon: 'none',
        duration: 2000,
        mask: true,
      });
      return;
    }

    var subject = this.data.selectedIndex;
    var classUuid = this.data.classUuid;
    var requestParams = {
      classUuid: classUuid,
      subject: subject,
      successFunc: bindSuccess,
    };
    SchoolAdminApi.bindTeacherToClass(requestParams);
  },
})

function bindSuccess(){
  wx.showToast({
    title: "绑定成功",
    icon: 'success',
    duration: 2000,
    mask: true,
    success: function(){
      setTimeout(function(){
        wx.reLaunch({
          url: '/pages/mine/mine',
        })
      }, 2000);
    }
  })
}
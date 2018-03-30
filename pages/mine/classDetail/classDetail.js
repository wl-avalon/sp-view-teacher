var SchoolAdminApi = require('/../../../apis/SchoolAdmin.js');
var LoginService = require("/../../../services/common/login.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classUuid: '',
    studentList: [],
    className: '',
    classNowGrade: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    LoginService.checkLogin();
    var classUuid = options.classUuid;
    this.setData({
      classUuid: classUuid,
      className: options.className,
      classNowGrade: options.classNowGrade,
    });
  },

  onShow: function (){
    var inputParams = {
      classUuid: this.data.classUuid,
      successFunc: this.getStudentListSuccess,
      failedFunc: this.getStudentListFailed,
    };
    SchoolAdminApi.getStudentOfClass(inputParams);
  },

  getStudentListSuccess: function(data){
    var studentList = data.studentList;
    this.setData({
      studentList: studentList,
      studentListCount: studentList.length,
    });
  },
  getStudentListFailed: function(){
    wx.showToast({
      title: "网络繁忙，请稍后再试",
      icon: 'none',
      duration: 2000,
      mask: true,
    });
  },
  jumpToAddStudent: function(){
    wx.navigateTo({
      url: '/pages/mine/addStudent/addStudent?classUuid=' + this.data.classUuid + '&className=' + this.data.className + '&classNowGrade=' + this.data.classNowGrade,
    })
  }
})
var HomeworkApi = require('/../../../apis/Homework.js');
var LoginService = require("/../../../services/common/login.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notDone: [],
    hasDone: [],
    averageTime: 0,
    homeworkItemUuid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var homeworkItemUuid = options.homeworkItemUuid;
    var classUuid = options.classUuid;
    this.setData({
      homeworkItemUuid: homeworkItemUuid,
      classUuid: classUuid,
    });
    var loginParams = {
      successFunc: this.loginSuccess,
    };
    LoginService.checkLogin(loginParams);
  },
  loginSuccess: function(){
    var requestParams = {
      homeworkItemUuid: this.data.homeworkItemUuid,
      classUuid: this.data.classUuid,
      successFunc: this.setHomeworkDetail,
    };
    HomeworkApi.getHomeworkItemDetail(requestParams);
  },
  setHomeworkDetail: function(data){
    var notDone = data.notDone;
    var hasDone = data.hasDone;
    var averageTime = data.averageTime;
    this.setData({
      notDone: notDone,
      hasDone: hasDone,
      averageTime: averageTime,
    });
  }
})
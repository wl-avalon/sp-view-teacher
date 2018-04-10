var HomeworkApi = require('/../../../apis/Homework.js');
var LoginService = require("/../../../services/common/login.js");
Page({
  data: {
    classUuid: '',
    className: '',
    classGrade: '',
    type: 0,        //访问类型 0:未定义 1:班主任 2:任课老师
    homeworkItemList: [],
  },

  onLoad: function (options) {
    var classUuid = options.classUuid; //classUuid = '845373327512956931';
    var className = options.className; //className = '10班';
    var classGrade = options.classGrade; //classGrade = '高二';
    var type = options.type; //type = 1;
    var loginParams = {
      successFunc: this.loginSuccess,
    };
    this.setData({
      classUuid: classUuid,
      className: className,
      classGrade: classGrade,
      type: type,
    });
    LoginService.checkLogin(loginParams);
  },
  loginSuccess: function(){
    var requestParams = {
      classUuid: this.data.classUuid,
      type: this.data.type,
      successFunc: this.setHomeworkItemList,
      failedFunc: this.getHomeworkListFailed,
    };
    HomeworkApi.getTodayLayoutHomeworkList(requestParams);
  },
  setHomeworkItemList: function(data){
    var list = data.homeworkItemList;
    var homeworkItemList = [];
    for (var i = 0; i < list.length; i++) {
      homeworkItemList.push({
        uuid: list[i].homeworkItemUuid,
        subject: list[i].subject,
        content: JSON.parse(list[i].content)['content'],
      });
    }
    this.setData({
      homeworkItemList: homeworkItemList,
    });
  },
  getHomeworkListFailed: function () {
    wx.showToast({
      title: "网络繁忙，请稍后再试",
      icon: 'none',
      duration: 2000,
      mask: true,
    });
  },
  jumpToHomeworkItemList: function(e){
    var selectIndex = e.currentTarget.dataset.idx;
    var homeworkItem = this.data.homeworkItemList[selectIndex];
    var homeworkItemUuid = homeworkItem.uuid;
    var classUuid = this.data.classUuid;
    wx.navigateTo({
      url: '/pages/home/homeworkItem/homeworkItem?homeworkItemUuid=' + homeworkItemUuid + '&classUuid=' + classUuid,
    })
  },
})
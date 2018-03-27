// pages/question/question.js
var initPageService = require("/../../services/question/questionIndex/InitPageService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    loginService.checkLogin();
    //1 从缓存获取选择器已选择的条件
    var selectCondition = initPageService.formatSelectCondition();
    
    //2 从Server获取一条随机的问题
    initPageService.getRandomQuestionFromServer(selectCondition, this);
  },

  onShow: function (){
    // console.log(this.data);
  },

  modifySelectedCondition: function () {
    wx.navigateTo({
      url: './modifySelect/modifySelect'
    })
  },

  queryQuestionAnalysis: function (event) {
    var jsonQuestionItem = JSON.stringify(event.currentTarget.dataset.questionItem);
    wx.navigateTo({
      url: './queryAnalysis/queryAnalysis?jsonQuestionItem=' + jsonQuestionItem,
    })
  }
})
// pages/question/queryAnalysis/queryAnalysis.js
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
    var questionItem = JSON.parse(options.jsonQuestionItem);

    var pageData = {};
    if (questionItem.questionKnowledgePoint){
      pageData.questionKnowledgePoint = questionItem.questionKnowledgePoint;
      pageData.hasKnowledgePoint      = true;
    }else{
      pageData.questionKnowledgePoint = "";
      pageData.hasKnowledgePoint      = false;
    }
    if (questionItem.questionQuestionPoint) {
      pageData.questionQuestionPoint  = questionItem.questionQuestionPoint;
      pageData.hasQuestionPoint       = true;
    } else {
      pageData.questionQuestionPoint  = "";
      pageData.hasQuestionPoint       = false;
    }
    if (questionItem.questionAnalysis){
      pageData.questionAnalysis = questionItem.questionAnalysis;
      pageData.hasQuestionAnalysis = true;
    }else{
      pageData.questionAnalysis = "";
      pageData.hasQuestionAnalysis = false;
    }
    this.setData(pageData);
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
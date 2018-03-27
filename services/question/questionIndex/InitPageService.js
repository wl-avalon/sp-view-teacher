var StudyPalaceApi = require("/../../../apis/StudyPalaceApi.js");

//从缓存获取之前选择的过滤器条件
var formatSelectCondition = function (){
  try {
    var jsonCondition = wx.getStorageSync(questionConditionConst.QUESTION_CONDITION_STORAGE_KEY);
    if (jsonCondition) {
      var condition = JSON.parse(jsonCondition);
      var grade = condition.grade ? condition.grade : 0;
      var subject = condition.subject ? condition.subject : 0;
      var version = condition.version ? condition.version : 0;
      var module = condition.module ? condition.module : 0;
      var node = condition.node ? condition.node : 0;
    } else {
      var grade = 0;
      var subject = 0;
      var version = 0;
      var module = 0;
      var node = 0;
    }
  } catch (e) {
    var grade = 0;
    var subject = 0;
    var version = 0;
    var module = 0;
    var node = 0;
  }
  var selectCondition = {
    grade: grade,
    subject: subject,
    version: version,
    module: module,
    node: node
  };
  return selectCondition;
}

//根据过滤器选择的条件，从Server获取一条问题，定义请求成功和失败时的回调函数
var getRandomQuestionFromServer = function(selectedCondition, page){
  var successFunc = function(res){
    var questionList    = res.data.data.questionList;
    var questionRemark  = res.data.data.questionRemark;
    if (questionRemark){
      var hasQuestionRemark = true;
    }else{
      var hasQuestionRemark = false;
    }
    page.setData({
      questionList: questionList,
      questionRemark: questionRemark,
      hasQuestionRemark: hasQuestionRemark,
    });
  }
  StudyPalaceApi.getRandomQuestion(selectedCondition, successFunc);
}

module.exports.formatSelectCondition = formatSelectCondition;
module.exports.getRandomQuestionFromServer = getRandomQuestionFromServer;
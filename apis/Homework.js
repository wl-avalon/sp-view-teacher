var uriConst = require('/../consts/request/uriConst.js');
var domain = require('/../consts/request/domain.js');
var CommonApi = require('/CommonApi.js');

var commitHomework = function (params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.COMMIT_TODAY_HOMEWORK;
  var postData = {
    class: params.class,
    subject: params.subject,
    homeworkList: JSON.stringify(params.homeworkList),
  };
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

var getTodayLayoutHomeworkList = function (params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.GET_TODAY_LAYOUT_HOMEWORK_LIST;
  var postData = {
    type: params.type,
    classUuid: params.classUuid,
  };
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

var getHomeworkItemDetail = function (params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.GET_HOMEWORK_ITEM_DETAIL;
  var postData = {
    homeworkItemUuid: params.homeworkItemUuid,
    classUuid: params.classUuid,
  };
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

module.exports.commitHomework = commitHomework;
module.exports.getTodayLayoutHomeworkList = getTodayLayoutHomeworkList;
module.exports.getHomeworkItemDetail = getHomeworkItemDetail;
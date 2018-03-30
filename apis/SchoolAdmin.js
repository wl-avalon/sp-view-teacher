var uriConst = require('/../consts/request/uriConst.js');
var domain = require('/../consts/request/domain.js');
var CommonApi = require('/CommonApi.js');

var addClass = function (params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.ADD_CLASS;
  var postData = {
    className: params.className,
    nowGrade: params.nowGrade,
  };
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

var addStudents = function (params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.ADD_STUDENTS;
  var postData = {
    studentList: JSON.stringify(params.studentList),
    class: params.classUuid,
  };
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

var getMyAllClass = function (params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.GET_MY_CLASS;
  var postData = {};
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

var getStudentOfClass = function (params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.GET_STUDENT_OF_CLASS;
  var postData = {
    'classUuid': params.classUuid,
  };
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

module.exports.addClass = addClass;
module.exports.addStudents = addStudents;
module.exports.getMyAllClass = getMyAllClass;
module.exports.getStudentOfClass = getStudentOfClass;
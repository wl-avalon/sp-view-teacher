//定义各种请求的uri PS:暂时先放在一个文件好了，以后多了再分
const GET_ONE_RANDOM_QUESTION = "/study-palace/question-ui/query/getRandomQuestionByCondition"; //根据条件获取随机的一个问题

const LOGIN     = "/study-palace/passport/commit/login";    //登陆
const REGISTER  = "/study-palace/passport/commit/register"; //注册

const COMMIT_TODAY_HOMEWORK = "/study-palace/homework/commit/commitHomework"; //提交今日作业
const GET_TODAY_LAYOUT_HOMEWORK_LIST = "/study-palace/homework/query/getTodayLayoutHomeworkList";//获取今天的作业
const GET_HOMEWORK_ITEM_DETAIL = "/study-palace/homework/query/getHomeworkItemDetail";//获取作业详情

const ADD_CLASS = "/study-palace/school-admin/commit/addClass"; //添加班级
const ADD_STUDENTS = "/study-palace/school-admin/commit/addStudents"; //添加学生
const GET_MY_CLASS = "/study-palace/school-admin/query/getMyAllClass"; //获取我的所有班级
const GET_STUDENT_OF_CLASS = "/study-palace/school-admin/query/getStudentOfClass";//获取班级学生列表
const GET_CLASS_DETAIL = "/study-palace/school-admin/query/getClassDetail";//获取班级详情
const BIND_TEACHER_TO_CLASS = "/study-palace/school-admin/commit/bindTeacherToClass";//绑定教师与班级

module.exports = {
  GET_ONE_RANDOM_QUESTION: GET_ONE_RANDOM_QUESTION,
  LOGIN: LOGIN,
  REGISTER: REGISTER,
  COMMIT_TODAY_HOMEWORK: COMMIT_TODAY_HOMEWORK,
  ADD_CLASS: ADD_CLASS,
  GET_MY_CLASS: GET_MY_CLASS,
  GET_STUDENT_OF_CLASS: GET_STUDENT_OF_CLASS,
  ADD_STUDENTS: ADD_STUDENTS,
  GET_CLASS_DETAIL: GET_CLASS_DETAIL,
  BIND_TEACHER_TO_CLASS: BIND_TEACHER_TO_CLASS,
  GET_TODAY_LAYOUT_HOMEWORK_LIST: GET_TODAY_LAYOUT_HOMEWORK_LIST,
  GET_HOMEWORK_ITEM_DETAIL: GET_HOMEWORK_ITEM_DETAIL,
}

//定义各种请求的uri PS:暂时先放在一个文件好了，以后多了再分
const GET_ONE_RANDOM_QUESTION = "/study-palace/question-ui/query/getRandomQuestionByCondition"; //根据条件获取随机的一个问题

const LOGIN     = "/study-palace/passport/commit/login";    //登陆
const REGISTER  = "/study-palace/passport/commit/register"; //注册

const COMMIT_TODAY_HOMEWORK = "/study-palace/homework/commit/commitHomework"; //提交今日作业

module.exports = {
  GET_ONE_RANDOM_QUESTION: GET_ONE_RANDOM_QUESTION,
  LOGIN: LOGIN,
  REGISTER: REGISTER,
  COMMIT_TODAY_HOMEWORK: COMMIT_TODAY_HOMEWORK,
}

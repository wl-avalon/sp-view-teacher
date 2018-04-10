// pages/mine/createQrCode/createQrCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,  //二维码类型 1:教师绑定班级 2:家长注册
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type      = options.type;
    var classUuid = options.classUuid;
    if(type == 1 || type == 2){
      console.log(classUuid);
      this.setData({
        classUuid: classUuid,
        type: type,
      });
    }
  },
})
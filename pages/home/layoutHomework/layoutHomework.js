var HomeworkApi = require('/../../../apis/Homework.js');

Page({

  data: {
    subjectArray: ['语文','数学','英语','物理','化学','生物','历史','地理','政治'],
    selectedIndex: 0,
    homeContentList: ['', ''],
    touchX: 0,
    touchY: 0,
    tempName: '',
    AnimatingName: '',
    deleteAnimation: '',
    initPage: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    var tempAniamtion = this.animation.left('0rpx').step();
    this.setData({
      deleteAnimation: tempAniamtion.export(),
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      selectedIndex: e.detail.value
    })
  },
  addHomeworkContentItem: function(){
    var homeContentList = this.data.homeContentList;
    homeContentList.push('');
    var tempAniamtion = this.animation.left('0rpx').step();
    this.setData({
      homeContentList: homeContentList,
      initPage: true,
      deleteAnimation: tempAniamtion.export(),
    });
  },
  moveEnd: function (e) {
    var X = e.changedTouches[0].clientX;
    var Y = e.changedTouches[0].clientY;
    var name = e.currentTarget.dataset.name;
    var data = null, tempAniamtion = null;
    if (this.data.touchX - X > 3 && Math.abs(this.data.touchY - Y) < 20) {
      if (this.data.AnimatingName) {
        tempAniamtion = this.animation.left('0rpx').step();
        this.setData({
          AnimatingName: '',
          deleteAnimation: tempAniamtion.export(),
          tempName: name,
        })
      } else {
        tempAniamtion = this.animation.left('-160rpx').step();
        this.setData({
          AnimatingName: name,
          deleteAnimation: tempAniamtion.export(),
          tempName: name,
        })
      }
    } else if (this.data.touchX - X < -3 && Math.abs(this.data.touchY - Y) < 20) {
      tempAniamtion = this.animation.left('0rpx').step();
      this.setData({
        deleteAnimation: tempAniamtion.export(),
        AnimatingName: ''
      });
    }
  },
  // 触摸开始事件
  moveStart: function (e) {
    this.data.touchX = e.changedTouches[0].clientX;
    this.data.touchY = e.changedTouches[0].clientY;
    this.setData({
      initPage: false,
    });
  },
  removeItem: function(e) {
    var idx = e.currentTarget.dataset.idx;
    // 如果没有这之间的代码，会有bug
    var tempAniamtion = this.animation.left('0rpx').step({ duration: 1 });
    this.data.AnimatingName = '';
    this.setData({
      AnimatingName: '',
      deleteAnimation: tempAniamtion.export()
    })
    // 如果没有这之间的代码，会有bug
    var homeContentList = this.data.homeContentList;
    homeContentList.splice(idx, 1);
    // arrList = initData.dealFriends(datas);
    this.setData({
      homeContentList: homeContentList,
    })
  },
  saveInput: function(e) {
    var content         = e.detail.value;
    var index           = e.currentTarget.dataset.idx;
    var homeContentList = this.data.homeContentList;
    homeContentList[index] = content;
  },
  commitHomework: function(){
    HomeworkApi.commitHomework({
      homeworkList: this.data.homeContentList,
      subject: this.data.selectedIndex,
      successFunc: commitHomeworkSuccess,
      failedFunc: commitHomeworkFailed,
    });
  }
})

function commitHomeworkSuccess(){
  wx.showToast({
    title: "成功",
    icon: 'success',
    duration: 2000,
    mask: true,
    success: function () {
      setTimeout(function () {
        wx.reLaunch({
          url: '/pages/home/home',
        });
      }, 2000);
    }   
  });
}

function commitHomeworkFailed(){
  wx.showToast({
    title: "网络出错了，回到首页看下有没有布置成功吧",
    icon: 'none',
    duration: 2000,
    mask: true,
  });
}
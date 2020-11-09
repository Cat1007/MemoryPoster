//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'memory-poster-env',
      traceUser: true,
    })
  },
  globalData: {}
})
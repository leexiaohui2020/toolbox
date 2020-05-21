import plugins from 'data'

Page({

  data: {
    plugins: [],
    hasPlugin: false
  },

  onLoad() {
    plugins.bind(this)
  },

  onUnload() {
    this.unbind()
  },

  // 跳转到插件管理页
  gotoPluginManager() {
    wx.navigateTo({ url: './manage/main' })
  }
})

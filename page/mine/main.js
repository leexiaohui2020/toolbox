Page({

  data: {
    init: false,
    userInfo: null
  },

  onReady() {
    Promise.all([
      this.init()
    ]).then(() => {
      this.setData({ init: true })
    })
  },

  init() {
    return App.$data.userInfo.then((userInfo = {}) => {
      this.setData({ userInfo })
    })
  },

  onGotUserInfo(e) {
    const { userInfo } = e.detail
    if (!userInfo) {
      return wx.showToast({
        icon: 'none',
        title: '更新头像失败'
      })
    }
    this.setData({ userInfo })
    App.$data.$state.login.userInfo = userInfo
    App.$api.user.setUserInfo(userInfo).then(({ data }) => {
      if (data.status === 'ok') {
        wx.showToast({ title: '已更新' })
      }
    })
  },

  linkToolLogs() {
    const url = '/page/toolcate/main?id=logs'
    wx.navigateTo({ url })
  }
})

export function login(state, next) {
  if (state.login) {
    return next(state.login)
  }
  wx.showLoading({ title: '加载中' })
  wx.login({
    success(res) {
      const { code } = res
      App.$api.user.login(code).then(res => {
        state.login = res.data.data
        state.cookie = res.cookies[0]
        next(state.login)
      })
    },
    complete() {
      wx.hideLoading()
    }
  })
}

export function userInfo(state, next) {
  this.login.then(({ userInfo = {} }) => {
    if (!userInfo.nickName) {
      userInfo.nickName = '游客'
    }
    if (!userInfo.avatarUrl) {
      userInfo.avatarUrl = App.$api.proxy.getImage('user-avatar-default.png')
    }
    next(userInfo)
  })
}

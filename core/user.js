import api from '../api/api'

class User {

  constructor() {
    this.$data = {}
    this.autoLogin()
  }

  autoLogin() {
    wx.login({
      success: async ({ code }) => {
        const { data: res } = await api.user.login(code)
        if (res.status === 'ok') {
          this.setData({
            userId: res.data._id,
            openId: res.data.openid
          })
        }
      }
    })
  }

  setData(obj) {
    Object.assign(this.$data, obj)
  }
}

export default new User()

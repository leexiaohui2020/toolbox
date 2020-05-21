import api from '../api/api'

import Observe from '../utils/libs/observe'

class User extends Observe {

  constructor() {
    super()
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
    this.runWatch()
  }
}

export default new User()

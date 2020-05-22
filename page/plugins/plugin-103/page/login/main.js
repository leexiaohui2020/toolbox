Page.createAdminPage({

  auth: false,
  data: {
    username: '',
    password: '',
  },

  // 输入监听
  inputHandler(e) {
    const { value } = e.detail
    const { id } = e.currentTarget.dataset
    this.setData({ [id]: value })
  },

  // 登录按钮
  async submitHandler() {
    const { username, password } = this.data
    const showError = title => wx.showToast({
      icon: 'none',
      title
    })

    if (!username) return showError('请填写帐号')
    if (!password) return showError('请填写密码')

    wx.showLoading({ title: '正在登录' })
    const { data: res } = await this.$api.login({ username, password })
    wx.hideLoading()
    if (res.status !== 'ok') return showError(res.errmsg)
    this.user.setData({ token: res.data.token })
    this.$api.setHeader({ token: res.data.token })
    wx.redirectTo({ url: '../home/main' })
  }
})

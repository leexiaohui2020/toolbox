// 创建管理后台页面
export function createAdminPage(opts = {}) {
  const config = Object.assign({}, opts, {

    onLoad() {
      // 管理员口令验证
      // 无口令时跳转到登录页面
      App.$user.watch(this.userWatcher = user => {
        this.user = user
        this.token = user.$data.token
        if (!this.token && opts.auth !== false) {
          wx.redirectTo({ url: '/page/plugins/plugin-103/page/login/main' })
        }
      }, true)

      this.$api = App.$api.admin
      if (typeof opts.onLoad === 'function') {
        opts.onLoad.apply(this, arguments)
      }
    },

    onUnload() {
      App.$user.unWatch(this.userWatcher)
      if (typeof opts.onUnload === 'function') {
        opts.onUnload.apply(this, arguments)
      }
    }
  })
  Page(config)
}

Page.createAdminPage = createAdminPage

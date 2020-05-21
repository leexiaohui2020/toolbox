Component({

  externalClasses: ['custom'],

  options: {
    addGlobalClass: true
  },

  data: {
    userInfo: null
  },

  attached() {
    console.info(123)
    // 监听用户对象
    App.$user.watch(this.userWatcher = user => {
      this.setData({ userInfo: user.$data.userInfo || null })
      console.info(user)
    }, true)
  },

  detached() {
    // 取消监听
    App.$user.unWatch(this.unWatcher)
  },

  methods: {

    // 获取到用户信息
    onGotUserInfo(e) {
      App.$api.user.setUserInfo(e.detail.userInfo)
    }
  }
})

Page.createAdminPage({

  data: {
    // 用户数据
    userdata: [
      { label: '今日新增', count: 0 },
      { label: '本周新增', count: 0 },
      { label: '本月新增', count: 0 },
    ],
    // 累计用户
    countUser: 0,

    // 初始化完成
    init: false
  },

  onLoad() {
    this.getHomeData()
  },

  // 获取首页数据
  async getHomeData() {
    wx.showLoading({ title: '正在加载' })
    const { data: res } = await this.$api.homeData()
    wx.hideLoading()
    if (res.status === 'ok') {
      this.setData(Object.assign(res.data, {
        init: true
      }))
    }
  }
})

Page({

  data: {
    // 食材缩略图
    coverImg: '',
    // 食材介绍
    intro: [],
    // 食材做法列表
    list: [],
    // 下一页id
    nextId: null,
    init: false,
  },

  onLoad(opts) {
    console.info(opts)
    this.id = opts.id
    this.title = opts.title
    if (!this.id || !this.title) return
    wx.setNavigationBarTitle({ title: this.title })
    this.getItemDetail(this.id)
  },

  // 上拉刷新
  async onPullDownRefresh() {
    await this.refreshData()
    wx.stopPullDownRefresh()
  },

  // 下拉获取下一页
  onReachBottom() {
    this.getNextPage()
  },

  // 获取食材做法大全
  async getItemDetail(id, cover) {
    wx.showLoading({ title: '正在加载' })
    const { data: res } = await App.$api.shipu.getItemDetail(id)
    wx.hideLoading()
    if (res.status === 'ok') {
      this.setData({
        coverImg: res.data.cover,
        intro: res.data.intro,
        list: cover ? res.data.list : this.data.list.concat(res.data.list),
        nextId: res.data.nextId,
        init: true
      })
    }
  },

  // 拉取下一页
  async getNextPage() {
    if (!this.data.nextId) return
    await this.getItemDetail(this.data.nextId)
  },

  // 刷新
  async refreshData() {
    await this.getItemDetail(this.id, true)
  },

  // 跳转到做法页面
  gotoContentPage(e) {
    const { id, title } = e.currentTarget.dataset
    wx.navigateTo({ url: `../content/main?id=${id}&title=${title}`})
  }
})

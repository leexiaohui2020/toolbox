Page({

  data: {
    list: [],
    loadEnd: false,
    keyword: ''
  },

  onLoad() {
    this.getList(this.page = 1)
  },

  onReachBottom() {
    if (!this.data.loadEnd) {
      this.getList(this.page + 1)
    }
  },

  async onPullDownRefresh() {
    await this.refreshData()
    wx.stopPullDownRefresh()
  },

  // 获取许愿列表
  async getList(page, cover) {
    wx.showLoading({ title: '正在加载' })
    const { data: res } = await App.$api.wish.list({
      page: Math.max(1, page),
      pagesize: 2,
      keyword: this.data.keyword
    })
    wx.hideLoading()
    if (res.status === 'ok') {
      const { data } = res;
      this.page = data.page
      this.setData({
        loadEnd: data.list.length < data.pagesize,
        list: cover ? data.list : this.data.list.concat(data.list)
      })
    }
  },

  inputHandler(e) {
    const { value } = e.detail
    this.setData({ keyword: value })
  },

  // 刷新数据
  refreshData() {
    return this.getList(1, true)
  }
})

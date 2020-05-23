Page({

  data: {
    mid: 0,
    init: false,
    detail: {},
    chapter: [],
    comment: []
  },

  onLoad(opts) {
    this.mid = +opts.mid
    this.urlkey = opts.urlkey

    if (!this.mid) {
      wx.showToast({ title: '该漫画不存在', icon: 'none' })
      return
    }

    wx.showLoading({ title: '加载中' })
    this.init().then(() => {
      this.setData({ init: true, mid: this.mid })
      this.directory = this.selectComponent('#directory')
    }).finally(() => {
      wx.hideLoading()
    })
  },

  async onReachBottom() {
    if (this.data.loadEnd) return
    wx.showLoading({ title: '加载中' })
    const { page, pagesize } = this
    await this.getComment(page + 1, pagesize)
    wx.hideLoading()
  },

  async init() {
    const page = this.page = 1
    const pagesize = this.pagesize = 20
    await this.getChapter(this.mid)
    await this.getComment(page, pagesize)
  },

  async getChapter(mid) {
    const { data } = await App.$api.cartoon.getChapter(mid)
    console.info(data)
    if (data.status === 'ok') {
      this.setData(data.data)
    }
  },

  async getComment(page, pagesize, cover = false) {
    const { mid } = this
    const { data } = await App.$api.cartoon.getComment({ page, pagesize, mid })
    if (data.status === 'ok') {
      const dataObj = {}
      dataObj.comment = cover ? data.data : this.data.comment.concat(data.data)
      dataObj.loadEnd = data.data.length <= 0
      this.setData(dataObj)
    }
  },

  openDirectory() {
    this.directory.open()
  }
})

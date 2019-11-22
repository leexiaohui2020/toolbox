Page({

  data: {
    init: false,
    title: '',
    paper: [],
    current: 0,
    detail: {},
    chapter: []
  },

  onLoad(opts) {
    this.mid = +opts.mid
    this.link = opts.link
    if (!this.mid || !this.link) return
    
    wx.showLoading({ title: '加载中' })
    this.init().then(() => {
      this.setData({ init: true, mid: this.mid, link: this.link })
      this.menu = this.selectComponent('#menu')
      this.directory = this.selectComponent('#directory')

      const { chapter, link } = this.data
      const currentIndex = chapter.findIndex(v => v.link === link)
      const currentItem = chapter[currentIndex]
      wx.setNavigationBarTitle({ title: currentItem.title })
      console.info(currentIndex)
      if (currentIndex > 0) {
        this.nextURL = `./main?mid=${this.mid}&link=${chapter[currentIndex - 1].link}`
      }
      if (currentIndex < chapter.length - 1) {
        this.prevURL = `./main?mid=${this.mid}&link=${chapter[currentIndex + 1].link}`
      }
    }).finally(() => {
      wx.hideLoading()
    })

    this.windowResizeHandler = () => this.getWindowWidth()
    wx.onWindowResize(this.windowResizeHandler)
  },

  onUnload() {
    wx.offWindowResize(this.windowResizeHandler)
  },

  async init() {
    this.getWindowWidth()
    await this.getPaper(1)
    await this.getChapter(this.mid)
  },

  async getPaper(page) {
    const { link } = this
    const { data } = await App.$api.cartoon.getPaper({ page, link })
    if (data.status === 'ok') {
      const ua = data.data.userAgent
      const paper = data.data.paper.map(item => App.$api.cartoon.getImage(item, ua))
      const title = data.data.title
      this.setData({ paper, title })
    }
  },

  async getChapter(mid) {
    const { data } = await App.$api.cartoon.getChapter(mid)
    if (data.status === 'ok') {
      this.setData(data.data)
    }
  },

  getWindowWidth() {
    this.windowWidth = wx.getSystemInfoSync().windowWidth
  },

  onCurrentChange(e) {
    const { current } = e.detail
    this.setData({ current })
  },

  nextPage() {
    const url = this.nextURL
    if (url) {
      wx.navigateTo({ url })
    } else {
      wx.showToast({ title: '已经是最后一章', icon: 'none' })
    }
  },

  prevPage() {
    const url = this.prevURL
    if (url) {
      wx.navigateTo({ url })
    } else {
      wx.showToast({ title: '已经是第一章', icon: 'none' })
    }
  },

  tapHandler(e) {
    const { x } = e.detail
    const unit = this.windowWidth / 3
    if (x > 2 * unit) {
      const current = this.data.current + 1
      if (current < this.data.paper.length) {
        this.setData({ current })
      }
    } else if (x > unit) {
      this.menu.open()
    } else {
      const current = this.data.current - 1
      if (current >= 0) {
        this.setData({ current })
      }
    }
  },

  openDirectory() {
    this.menu.close()
    wx.nextTick(() => this.directory.open())
  }
})

Page.createTool({
  toolId: 818,
  toolName: '必应(Bing)每日壁纸',
  toolCate: [105],

  data: {
    imgURL: '',
    date: '',
    endDate: '',
    startDate: '2016-03-12',
    sizeList: [
      '1920x1080',
      '1280x768',
      '1366x768',
      '1024x768',
      '800x600',
      '800x480',
      '720x1280',
      '640x480',
      '480x800',
      '400x240',
      '320x240',
      '240x320'
    ],
    sizeIndex: 0
  },

  onLoad() {
    const date = App.$utils.toLocaleDateString()
    const now = new Date()
    this.setData({
      date,
      endDate: date
    }, () => this.getBingWallPaper())
  },

  inputHandler(e) {
    const { key } = e.currentTarget.dataset
    const { value } = e.detail
    this.setData({ [key]: value })
  },

  getBingWallPaper() {
    const { date, sizeIndex, sizeList } = this.data
    const size = sizeList[sizeIndex]
    wx.showLoading({ title: '获取中' })
    App.$api.proxy.getBingWallPaper(date, size).then(imgURL => {
      this.setData({ imgURL })
    }).finally(() => wx.hideLoading())
  },

  save() {
    const { imgURL } = this.data
    if (imgURL) {
      App.$utils.saveNetPhoto(imgURL)
    }
  }
})

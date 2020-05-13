Page.createTool({
  toolId: 817,
  toolName: '哔哩哔哩视频封面获取',
  toolCate: [105],
  toolCreatedAt: new Date('2019/11/12'),

  data: {
    avNumber: '',
    coverURL: ''
  },

  inputHandler(e) {
    const { key } = e.currentTarget.dataset
    const { value } = e.detail
    this.setData({ [key]: value })
  },

  getCoverURL() {
    const { avNumber } = this.data
    if (!avNumber) {
      return wx.showToast({ title: '请填写AV号', icon: 'none' })
    }
    wx.showLoading({ title: '正在获取' })
    App.$api.proxy.getBilibiliCoverURL(avNumber).then(({ data }) => {
      if (data.status === 'ok') {
        const part = data.data.split(',')
        const etx = part[0].match(/data:image\/(\w+);/)[1]
        return App.$utils.base64ToTempFilePath(part[1], etx).then(coverURL => {
          this.setData({ coverURL })
        })
      }
    }).finally(() => wx.hideLoading())
  },

  save() {
    if (this.data.coverURL) {
      App.$utils.savePhoto(this.data.coverURL)
    }
  }
})

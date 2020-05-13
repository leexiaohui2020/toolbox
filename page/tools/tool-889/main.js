Page.createTool({
  toolId: 889,
  toolName: '诺基亚短信图片生成器',
  toolCate: [105],
  toolCreatedAt: new Date('2020/5/13'),

  data: {
    value: '',
    imgDataUrl: null
  },

  inputHandler(e) {
    const { value } = e.detail
    this.setData({ value })
  },

  async submitHandler() {
    const { value } = this.data
    if (!value) {
      wx.showToast({
        icon: 'none',
        title: '请输入短信内容'
      })
      return
    }

    wx.showLoading({ title: '图片生成中' })
    const { data: res } = await App.$api.proxy.getNokiaMessageImage(value)
    wx.hideLoading()
    if (res.status !== 'ok') {
      wx.showToast({
        icon: 'none',
        title: res.errmsg
      })
      return
    }
    this.setData({ imgDataUrl: res.data }, () => {
      wx.pageScrollTo({
        selector: '.result',
        duration: 500
      })
    })
  },

  async saveToPhoto() {
    const { imgDataUrl } = this.data
    if (!imgDataUrl) return
    wx.showLoading({ title: '正在保存' })
    const tmpFilePath = await App.$utils.base64ToTempFilePath(imgDataUrl, 'png')
    await App.$utils.savePhoto(tmpFilePath)
    wx.hideLoading()
  }
})

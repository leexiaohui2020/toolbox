Page.createTool({
  toolId: 926,
  toolName: '动物识别器',
  toolCate: [107],
  toolCreatedAt: new Date('2020/05/13'),

  data: {
    result: null
  },

  async chooseImage() {
    const e = await App.$utils.chooseImageSecu()
    if (e.errMsg !== 'chooseImage:ok') return
    this.setData({ result: null }, async () => {
      wx.showLoading({ title: '正在识别' })
      const img = await App.$utils.tempFilePathToBase64(e.tempFilePaths[0])
      const { data: res } = await App.$api.proxy.getAnimalClassifyInfo(img)
      wx.hideLoading()
      if (res.status !== 'ok') {
        wx.showToast({ icon: 'none', title: res.errmsg })
        return
      }
      this.setData({
        result: res.data
      })
    })
  }
})

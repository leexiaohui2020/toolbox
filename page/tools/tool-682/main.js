Page.createTool({

  toolId: 682,
  toolName: '图片转Base64编码',
  toolCate: [100],

  data: {
    source: '',
    base64: ''
  },

  chooseImage() {
    App.$utils.chooseImageSecu({ count: 1 }).then((res) => {
      const source = res.tempFilePaths[0]
      wx.showLoading({ title: '转换中' })
      App.$utils.tempFilePathToBase64(source).then(base64 => {
        this.setData({ source, base64 })
        wx.hideLoading()
      })
    })
  },

  copy() {
    App.$utils.copyText(this.data.base64)
  }
})

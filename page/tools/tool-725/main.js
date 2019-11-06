Page.createTool({

  toolId: 725,
  toolName: '条形码/二维码解析',
  toolCate: [107],

  data: {
    type: '',
    result: '',
  },

  onLoad() {
    this.buttonHandler()
  },

  buttonHandler() {
    wx.scanCode({
      success: res => {
        const { result } = res
        const type = res.scanType
        this.setData({ result, type })
      }
    })
  }
})

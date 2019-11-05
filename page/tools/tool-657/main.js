Page.createTool({

  toolId: 657,
  toolName: 'MD5加密',
  toolCate: [100],

  data: {
    originalText: '',
    ciphertText: ''
  },

  inputHandler(e) {
    const originalText = e.detail.value
    this.setData({ originalText })
  },

  copy() {
    App.$utils.copyText(this.data.ciphertText)
  },

  buttonHandler() {
    const ciphertText = App.$utils.CryptoJS.MD5(this.data.originalText).toString()
    this.setData({ ciphertText })
  }
})

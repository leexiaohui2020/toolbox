import md5 from 'md5'

Page({

  toolId: 657,
  toolName: 'MD5加密',

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
    const ciphertText = md5(this.data.originalText)
    this.setData({ ciphertText })
  }
})

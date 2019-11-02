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
    wx.setClipboardData({
      data: this.data.ciphertText,
      success() {
        wx.showToast({ title: '复制成功', icon: 'success' })
      },
      fail() {
        wx.showToast({ title: '复制失败', icon: 'none' })
      }
    })
  },

  buttonHandler() {
    const ciphertText = md5(this.data.originalText)
    this.setData({ ciphertText })
  }
})

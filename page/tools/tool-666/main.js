Page({

  toolId: 666,
  toolName: 'URL编码/解码',

  data: {
    text1: '',
    text2: ''
  },

  inputHandler(e) {
    const text1 = e.detail.value
    this.setData({ text1 })
  },

  encode() {
    const text2 = encodeURIComponent(this.data.text1)
    this.setData({ text2 })
  },

  decode() {
    const text2 = decodeURIComponent(this.data.text1)
    this.setData({ text2 })
  },

  copy() {
    App.$utils.copyText(this.data.text2)
  }
})

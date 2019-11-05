import * as wordcard from 'wordcard'
const CryptoJS = App.$utils.CryptoJS

Page.createTool({

  toolId: 681,
  toolName: 'BASE64编码解码',
  toolCate: [100],

  data: {
    text1: '',
    text2: '',
    wordcard
  },

  methods: {
    inputHandler(e) {
      const { key } = e.currentTarget.dataset
      const { value } = e.detail
      this.setData({ [key]: value })
    },

    encode() {
      const str = CryptoJS.enc.Utf8.parse(this.data.text1)
      const text2 = CryptoJS.enc.Base64.stringify(str).toString()
      this.setData({ text2 })
    },

    decode() {
      const words = CryptoJS.enc.Base64.parse(this.data.text1)
      const text2 = words.toString(CryptoJS.enc.Utf8)
      this.setData({ text2 })
    },

    copy() {
      App.$utils.copyText(this.data.text2)
    },

    clear() {
      this.setData({ text1: '', text2: '' })
    }
  }
})

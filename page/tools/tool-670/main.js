import {
  AsciiToUnicode,
  UnicodeToAscii,
  UnicodeToChinese,
  ChineseToUnicode
} from 'crypto'

Page.createTool({

  toolId: 670,
  toolName: 'Unicode编码转换',
  toolCate: [100],

  data: {
    text1: '',
    text2: '',
    tips: ''
  },

  setTips(tips) {
    this.setData({ tips })
  },

  inputHandler(e) {
    const text1 = e.detail.value
    this.setData({ text1 })
  },

  u2c() {
    const text2 = UnicodeToChinese(this.data.text1)
    if (text2 instanceof Error) {
      return this.setTips(text2.message)
    }
    this.setData({ text2, tips: '' })
  },

  c2u() {
    const text2 = ChineseToUnicode(this.data.text1)
    if (text2 instanceof Error) {
      return this.setTips(text2.message)
    }
    this.setData({ text2, tips: '' })
  },

  u2a() {
    const text2 = UnicodeToAscii(this.data.text1)
    if (text2 instanceof Error) {
      return this.setTips(text2.message)
    }
    this.setData({ text2, tips: '' })
  },

  a2u() {
    const text2 = AsciiToUnicode(this.data.text1)
    if (text2 instanceof Error) {
      return this.setTips(text2.message)
    }
    this.setData({ text2, tips: '' })
  },

  copy() {
    App.$utils.copyText(this.data.text2)
  },

  clear() {
    this.setData({
      text1: '',
      text2: '',
      tips: ''
    })
  }
})

import transverter from 'transverter'

Page.createTool({
  
  toolId: 671,
  toolName: '中文简体繁体转换',
  toolCate: [101],

  data: {
    text1: '',
    text2: '',
    langIndex: 0,
    langList: ['无', '台湾']
  },

  toSimplified() {
    const str = this.data.text1
    const language = ['', 'zh_TW'][this.data.langIndex]
    const obj = { str, language, type: 'simplified' }
    const text2 = transverter(obj)(obj)
    this.setData({ text2 })
  },

  toTraditional() {
    const str = this.data.text1
    const language = ['', 'zh_TW'][this.data.langIndex]
    const obj = { str, language, type: 'traditional' }
    const text2 = transverter(obj)(obj)
    this.setData({ text2 })
  },

  inputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    this.setData({ [key]: value })
  },

  copy() {
    App.$utils.copyText(this.data.text2)
  },
  
  clear() {
    this.setData({
      text1: '',
      text2: ''
    })
  }
})
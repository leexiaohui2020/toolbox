Page.createTool({

  toolId: 679,
  toolName: '文本加密解密',
  toolCate: [100],

  data: {
    text: '',
    pass: '',
    result: '',
    typeList: ['AES', 'DES', 'RC4', 'Rabbit', 'TripleDES'],
    typeIndex: 0
  },

  inputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    this.setData({ [key]: value })
  },

  buttonHandler(e) {
    const { key } = e.currentTarget.dataset
    const { text, pass, typeList, typeIndex } = this.data
    const type = typeList[typeIndex]
    const CryptoJS = App.$utils.CryptoJS
    let result
    if (key == 'encrypt') {
      result = CryptoJS[type].encrypt(text, pass).toString()
    } else {
      result = CryptoJS[type].decrypt(text, pass).toString(CryptoJS.enc.Utf8)
    }
    this.setData({ result })
  },

  copy() {
    App.$utils.copyText(this.data.result)
  },

  clear() {
    this.setData({ text: '', result: '' })
  }
})

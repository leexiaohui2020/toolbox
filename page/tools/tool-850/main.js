import { valuesDecode, valuesEncode } from 'encode'

Page.createTool({

  toolId: 850,
  toolName: '社会主义价值观加密/解密',
  toolCate: [100],

  data: {
    value: '',
    result: ''
  },

  inputHandler(e) {
    const { value } = e.detail
    this.setData({ value })
  },

  encode() {
    const result = valuesEncode(this.data.value)
    this.setData({ result })
  },

  decode() {
    const result = valuesDecode(this.data.value)
    this.setData({ result })
  },

  copy() {
    App.$utils.copyText(this.data.result)
  },

  clear() {
    this.setData({ value: '', result: '' })
  }
})

import { chouxiang } from './cxh.js'

Page.createTool({

  toolId: 864,
  toolName: '抽象话转换器',
  toolCate: [101],
  toolCreatedAt: new Date('2020/5/13'),

  data: {
    value: '',
    result: '',
  },

  inputHandler(e) {
    const { value } = e.detail
    this.setData({ value })
  },

  submitHandler() {
    const { value } = this.data
    if (!value) {
      wx.showToast({ icon: 'none', title: '请输入要转换的语句' })
      return
    }

    const result = chouxiang(value)
    this.setData({ result })
  },

  resetHandler() {
    this.setData({
      value: '',
      result: ''
    })
  },

  copyHandler() {
    App.$utils.copyText(this.data.result)
  }
})

import calculator from 'calculator'

Page.createTool({

  toolId: 659,
  toolName: '金额数字转大写',
  toolCate: [106],

  data: {
    tips: '',
    amount: '',
    result: ''
  },

  setTips(tips) {
    this.setData({ tips })
  },

  inputHandler(e) {
    const amount = e.detail.value
    this.setData({ amount })
  },

  buttonHandler() {
    const result = calculator(this.data.amount)
    if (result instanceof Error) {
      return this.setTips(result.message)
    }
    this.setData({ result, tips: '' })
  },

  copy() {
    App.$utils.copyText(this.data.result)
  }
})

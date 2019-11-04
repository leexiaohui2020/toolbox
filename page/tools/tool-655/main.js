import * as wordcard from 'wordcard'

Page.createTool({
  
  toolId: 655,
  toolName: '国债计算器',
  toolCate: [ 106 ],

  data: {
    rate: '',
    amount: '',
    annualized: '',
    summary: '',
    tips: '',
    wordcard,

    yearList: [2,3,5,10],
    yearIndex: 0
  },

  inputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    this.setData({ [key]: value })
  },

  buttonHandler() {
    const { rate, amount, yearIndex } = this.data
    const years = this.data.yearList[yearIndex]
    const numRate = +rate
    const numAmount = +amount
    const setTips = this.setTips.bind(this)
    const check = val => isNaN(val) || val < 0

    if (!amount) return setTips('投资金额不能为空')
    if (check(numAmount)) return setTips('投资金额格式不正确')
    if (!rate) return setTips('国债利率不能为空')
    if (check(numRate)) return setTips('国债利率格式不正确')
    if (check(years)) return setTips('规定存期格式不正确')

    const annualized = numAmount * (numRate / 100) * years
    const summary = numAmount + annualized
    this.setData({
      tips: '',
      summary: summary.toFixed(2),
      annualized: annualized.toFixed(2)
    })
  },

  setTips(tips) {
    this.setData({ tips })
  }
})

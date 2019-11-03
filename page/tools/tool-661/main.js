Page({

  toolId: 661,
  toolName: '理财计算器',

  data: {
    amount: '',
    rate: '',
    days: '',
    annualized: '',
    summary: '',
    tips: ''
  },

  setTips(tips) {
    this.setData({ tips })
  },

  inputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    this.setData({ [key]: value })
  },

  buttonHandler() {
    const { amount, rate, days } = this.data
    const setTips = this.setTips.bind(this)
    const RE = /^(0|[1-9]\d*)(\.\d+)?$/
    if (!amount) return setTips('投资金额不能为空')
    if (!RE.test(amount)) return setTips('投资金额格式不正确')
    if (!rate) return setTips('年化收益率不能为空')
    if (!RE.test(rate)) return setTips('年化收益率格式不正确')
    if (!days) return setTips('投资天数不能为空')
    if (!RE.test(rate)) return setTips('投资天数不能为空')
    const { summary, annualized } = this.calculator(+amount, +rate, +days)
    this.setData({ summary, annualized, tips: '' })
  },

  calculator(a, r, d) {
    const annualized = a * (parseFloat(r) / 100) * d / 365
    const summary = parseFloat(a) + annualized
    return { summary, annualized }
  }
})

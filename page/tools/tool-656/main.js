import calc from 'calculator'

Page.createTool({

  toolId: 656,
  toolName: '贷款计算器',
  toolCate: [ 106 ],

  data: {
    amount: '200000',
    rate: '5.58',
    year: '15',
    monthList: [0,1,2,3,4,5,6,7,8,9,10,11],
    monthIndex: 0,
    typeList: ['等额本息', '等额本金'],
    typeIndex: 0,
    period: '0',
    rateTotal: '0',
    total: '0',
    tips: '',
    detail: null,
    detailTitleFixed: false
  },

  inputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    this.setData({ [key]: value })
  },

  buttonHandler() {
    const { amount, rate, year, monthIndex, typeIndex } = this.data
    const numAmount = +amount
    const numRate = +rate
    const numYear = +year
    const month = this.data.monthList[monthIndex]
    const type = this.data.typeList[typeIndex]
    const setTips = this.setTips.bind(this)
    const check = val => isNaN(val) || val < 0
    const check2 = val => check(val) || val % 1 !== 0

    if (!amount) return setTips('贷款金额不能为空')
    if (check(numAmount)) return setTips('贷款金额格式不正确')
    if (!rate) return setTips('贷款年利率不能为空')
    if (check(numRate)) return setTips('贷款年利率格式不正确')
    if (!year) return setTips('贷款年限不能为空')
    if (check2(numYear) || check2(month)) {
      return setTips('贷款年限格式不正确')
    }
    const period = numYear * 12 + month
    const res = calc(numAmount, numRate, period, type)
    this.setData({
      tips: '',
      total: res.total.toFixed(2),
      period: res.period,
      rateTotal: res.rateTotal.toFixed(2),
      detail: res.detail
    })
  },

  setTips(tips) {
    this.setData({ tips })
  },

  checkDetailTitleFixed(top) {
    const callback = (height) => {
      this.detailTitleScrollHeight = height
      const detailTitleFixed = top >= height
      this.setData({ detailTitleFixed })
    }
    if (this.detailTitleScrollHeight) {
      callback(this.detailTitleScrollHeight)
    } else {
      this.getDetailTitleScrollHeight(callback)
    }
  },

  getDetailTitleScrollHeight(cb) {
    const query = wx.createSelectorQuery()
    query.select('.detail-title').boundingClientRect()
    query.exec(res => {
      cb(res[0].height * 2 + res[0].top)
    })
  },

  onPageScroll({ scrollTop }) {
    this.checkDetailTitleFixed(scrollTop)
  }
})

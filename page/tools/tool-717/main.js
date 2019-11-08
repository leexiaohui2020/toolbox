Page.createTool({

  toolId: 717,
  toolName: '时间换算',
  toolCate: [103],

  data: {
    day: '',
    hour: '',
    week: '',
    min: '',
    sec: '',
    ms: '',
    year: ''
  },

  inputHandler(e) {
    const { key } = e.currentTarget.dataset
    const { value } = e.detail
    if (parseFloat(value) != value && value !== '') {
      return this.data[key]
    }
    this.setData({ [key]: value })
  },

  actionHandler(e) {
    const { key } = e.currentTarget.dataset
    const data = this.data
    const dataObj = {}
    dataObj.ms = this.getMs(key)
    if (!dataObj.ms) return
    dataObj.sec = dataObj.ms / 1000
    dataObj.min = dataObj.sec / 60
    dataObj.hour = dataObj.min / 60
    dataObj.day = dataObj.hour / 24
    dataObj.week = dataObj.day / 7
    dataObj.year = dataObj.day / 356
    this.setData(dataObj)
  },

  getMs(key) {
    const { data } = this
    if (key === 'ms') return data[key]
    if (key === 'sec') return data[key] * 1000
    if (key === 'min') return data[key] * 1000 * 60
    if (key === 'hour') return data[key] * 1000 * 60 * 60
    if (key === 'day') return data[key] * 1000 * 60 * 60 * 24
    if (key === 'week') return data[key] * 1000 * 60 * 60 * 24 * 7
    if (key === 'year') return data[key] * 1000 * 60 * 60 * 24 * 356
    return 0
  },

  clear() {
    this.setData({
      day: '',
      hour: '',
      week: '',
      min: '',
      sec: '',
      ms: '',
      year: ''
    })
  }
})

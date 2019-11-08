const transMap = {
  kgf: 1,
  n: 9.80665,
  kn: 0.0098067,
  gf: 999.9999971,
  lbf: 2.2046226,
  kip: 0.0022046,
  tf: 0.001
}

Page.createTool({

  toolId: 709,
  toolName: '力换算',
  toolCate: [103],

  data: {
    kgf: '',
    n: '',
    kn: '',
    gf: '',
    lbf: '',
    kip: '',
    tf: ''
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
    const dataObj = {}
    dataObj.kgf = this.getKgf(key)
    if (!dataObj.kgf) return
    dataObj.n = (dataObj.kgf / transMap.kgf) * transMap.n
    dataObj.kn = (dataObj.kgf / transMap.kgf) * transMap.kn
    dataObj.gf = (dataObj.kgf / transMap.kgf) * transMap.gf
    dataObj.lbf = (dataObj.kgf / transMap.kgf) * transMap.lbf
    dataObj.kip = (dataObj.kgf / transMap.kgf) * transMap.kip
    dataObj.tf = (dataObj.kgf / transMap.kgf) * transMap.tf
    this.setData(dataObj)
  },

  getKgf(key) {
    const { data } = this
    if (key in transMap) {
      return ( data[key] / transMap[key] ) * transMap.kgf
    }
    return 0
  },

  clear() {
    this.setData({
      kgf: '',
      n: '',
      kn: '',
      gf: '',
      lbf: '',
      kip: '',
      tf: ''
    })
  }
})

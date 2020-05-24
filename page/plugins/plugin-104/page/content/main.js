Page({

  data: {
    author: null,
    baseInfo: null,
    material: null,
    steps: null,
    init: false,
    currentStep: 0,
  },

  onLoad(opts) {
    this.id = opts.id
    this.title = opts.title
    if (!this.id || !this.title) return
    wx.setNavigationBarTitle({ title: this.title })
    this.getCaiPu(this.id)
  },

  // 获取菜谱做法
  async getCaiPu(id) {
    wx.showLoading({ title: '正在加载' })
    const { data: res } = await App.$api.shipu.getCaiPu(id)
    wx.hideLoading()
    if (res.status === 'ok') {
      this.setData({
        author: res.data.author,
        baseInfo: res.data.baseInfo,
        material: res.data.material,
        steps: res.data.steps,
        init: true
      })
    }
  },

  // 监听当前步骤
  onCurrentStepChange(e) {
    const { current } = e.detail
    this.setData({ currentStep: current })
  }
})
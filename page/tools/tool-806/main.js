Page.createTool({

  toolId: 806,
  toolName: '标准中文电码查询',
  toolCate: [107],
  toolCreatedAt: new Date('2019/11/27'),

  data: {
    value: '',
    result: []
  },

  inputHandler(e) {
    const { value } = e.detail
    this.setData({ value })
  },

  async getResult() {
    const { value } = this.data
    if (!value) {
      return wx.showToast({
        icon: 'none',
        title: '请输入需要查询的汉字'
      })
    }
    wx.showLoading({ title: '正在查询' })
    const { data } = await App.$api.proxy.getChineseCommercialCode(value)
    wx.hideLoading()
    if (data.status !== 'ok') return
    if (data.data.length === 0) {
      return wx.showModal({
        title: '提示',
        content: `查询不到“${value}”对应的电码`
      })
    }
    this.setData({ result: data.data })
  }
})

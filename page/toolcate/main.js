Page({

  data: {
    list: null
  },

  onLoad(opts) {
    const { id } = opts
    if (id === 'logs') {
      this.getToolLogs()
    } else {
      this.getToolList(id)
    }
  },

  getToolList(id) {
    const cate = App.createTool.cates.find(v => v.id == id)
    if (cate) {
      const list = cate.tools
      const title = cate.name
      this.setData({ list })
      wx.setNavigationBarTitle({ title })
    }
  },

  getToolLogs() {
    const list = App.createTool.getLogs()
    this.setData({ list })
    wx.setNavigationBarTitle({ title: '使用记录' })
  }
})

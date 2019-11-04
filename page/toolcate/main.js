Page({

  data: {
    list: null
  },

  onLoad(opts) {
    const { id } = opts
    this.getToolList(id)
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

  toolTapHandler(e) {
    const { id } = e.currentTarget.dataset
    const url = `/page/tools/tool-${id}/main`
    wx.navigateTo({ url })
  }
})

Page({

  data: {
    tools: []
  },

  onLoad(opts) {
    const { keyword } = opts
    if (typeof keyword === 'string') {
      this.searchTools(keyword)
    }
  },

  searchTools(keyword) {
    const tools = App.createTool.search(keyword)
    wx.setNavigationBarTitle({
      title: `共搜索到 ${tools.length} 件工具`,
    })
    this.setData({ tools })
  },

  toolTapHandler(e) {
    const { id } = e.currentTarget.dataset
    const url = `/page/tools/tool-${id}/main`
    wx.navigateTo({ url })
  }
})

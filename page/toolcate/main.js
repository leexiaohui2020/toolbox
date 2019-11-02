import { cates, tools } from '../tools/tool'

Page({

  data: {
    list: []
  },

  onLoad(opts) {
    const { id } = opts
    const cate = cates.find(v => v.id == id)
    const list = tools.filter(v => v.cate == id)
    const title = cate.name
    this.setData({ list })
    wx.setNavigationBarTitle({ title })
  },

  toolTapHandler(e) {
    const { id } = e.currentTarget.dataset
    const url = `/page/tools/tool-${id}/main`
    wx.navigateTo({ url })
  }
})

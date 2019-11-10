import { cates } from '../tools/tool'

Page({

  data: {
    cates: null
  },

  onLoad() {
    this.getShowCates()
  },

  onShareAppMessage() {
    return {
      title: 'Toolplus，大家都在用的工具箱',
      path: '/page/home/main',
      imageUrl: '/img/share.png'
    }
  },

  getShowCates() {
    const cates = App.createTool.cates.filter(v => v.tools.length)
    this.setData({ cates })
  },

  cateTapHandler(e) {
    const { id } = e.currentTarget.dataset
    const url = `/page/toolcate/main?id=${id}`
    wx.navigateTo({ url })
  }
})

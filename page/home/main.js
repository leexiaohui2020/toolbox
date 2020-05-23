import { cates } from '../tools/tool'

Page({

  data: {
    cates: null,
    // 推荐工具
    recommand: [944, 943, 728, 869, 699],
    recommandCurrent: 0
  },

  onLoad() {
    this.getShowCates()
    this.setData({
      recommand: this.data.recommand.map(id => {
        if (typeof id === 'number') {
          return Page.createTool.tools.find(v => v.id === id)
        }
      })
    })
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
  },

  recommandCurrentChangeHandler(e) {
    const { current } = e.detail
    this.setData({
      recommandCurrent: Math.min(this.data.recommand.length - 1, current)
    })
  },

  // 点击推荐工具
  recommandClickHandler(e) {
    const { id } = e.currentTarget.dataset
    const url = `/page/tools/tool-${id}/main`
    wx.navigateTo({ url })
  }
})

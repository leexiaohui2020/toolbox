import { cates } from '../tools/tool'

Page({

  data: {
    cates: cates.filter(v => !v.hide)
  },

  cateTapHandler(e) {
    const { id } = e.currentTarget.dataset
    const url = `/page/toolcate/main?id=${id}`
    wx.navigateTo({ url })
  }
})

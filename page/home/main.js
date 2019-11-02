import { cates } from '../tools/tool'

Page({

  data: {
    cates
  },

  cateTapHandler(e) {
    const { id } = e.currentTarget.dataset
    const url = `/page/toolcate/main?id=${id}`
    wx.navigateTo({ url })
  }
})

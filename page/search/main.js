import * as history from 'history'

Page({

  data: {
    keyword: '',
    history: []
  },

  onLoad() {
    this.getHistory()
  },

  inputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    this.setData({ [key]: value })
  },

  actionHandler() {
    wx.showModal({
      title: '温馨提示',
      content: '确认清空历史？',
      success: (e) => {
        if (e.confirm) {
          this.removeHistory()
        }
      }
    })
  },

  buttonHandler() {
    this.search(this.data.keyword)
  },

  tagTapHandler(e) {
    const { keyword } = e.currentTarget.dataset
    this.search(keyword)
  },

  search(keyword) {
    const url = `./result/main?keyword=${keyword}`
    wx.navigateTo({ url })
    this.addHistory(keyword)
  },

  getHistory() {
    this.setData({ history: history.history.slice(0) })
  },

  addHistory(keyword) {
    history.add(keyword)
    this.getHistory()
  },

  removeHistory() {
    history.clear()
    this.getHistory()
  }
})

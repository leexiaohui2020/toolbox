import plugins from '../data'

Page({

  data: {
    plugins: []
  },

  onLoad() {
    plugins.bind(this)
  },

  onUnload() {
    this.unbind()
  },

  // 开关监听
  switchHandler(e) {
    const { value } = e.detail
    const { id } = e.currentTarget.dataset

    const item = plugins.findOne({ id })
    if (item) {
      item.update({ hidden: !value })
    } else {
      plugins.addOne({ id, hidden: !value })
    }
  }
})

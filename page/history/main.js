Page({

  data: {
    logs: [],
  },

  onLoad() {
    this.setData({
      logs: Page.createTool.getLogs().map(item => {
        return Object.assign({}, item, {
          _updateTime: item.updateTime.toString()
        })
      })
    })
  }
})
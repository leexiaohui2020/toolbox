Page({

  data: {
    logs: [],
  },

  onLoad() {
    this.setData({
      logs: Page.createTool.getLogs()
    })
  }
})
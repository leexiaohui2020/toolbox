Component({
  externalClasses: ['custom'],
  options: {
    addGlobalClass: true
  },
  data: {
    count: '--'
  },

  attached() {
    this.countTools()
  },

  methods: {
    countTools() {
      const count = App.createTool.tools.length
      this.setData({ count })
    },

    tapHandler() {
      const url = '/page/search/main'
      wx.navigateTo({ url })
    }
  }
})

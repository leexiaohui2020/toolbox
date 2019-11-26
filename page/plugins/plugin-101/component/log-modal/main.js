Component({
  
  options: {
    addGlobalClass: true,
  },

  data: {
    cartoon: null
  },

  attached() {
    this.drawer = this.selectComponent('#drawer')
  },

  methods: {
    open(cartoon) {
      this.setData({ cartoon })
      this.drawer.open()
    },

    actionHandler() {
      const { mid, link, current } = this.data.cartoon
      const url = `./pager/main?mid=${mid}&link=${link}&current=${current}`
      wx.navigateTo({ url })
      this.drawer.close()
    }
  }
})

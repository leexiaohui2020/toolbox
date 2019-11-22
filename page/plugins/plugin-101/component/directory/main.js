Component({

  properties: {
    list: {
      type: Array,
      value: []
    },

    mid: {
      type: Number
    },

    selected: {
      type: String,
      value: ''
    }
  },

  attached() {
    this.drawer = this.selectComponent('#drawer')
  },

  methods: {
    open() {
      this.drawer.open()
    },
    close() {
      this.drawer.close()
    },

    selectHandler(e) {
      const { link } = e.currentTarget.dataset
      const { mid } = this.data
      const url = `../pager/main?mid=${mid}&link=${link}`
      wx.navigateTo({ url })
    }
  }
})

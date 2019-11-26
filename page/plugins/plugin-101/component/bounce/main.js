Component({

  options: {
    addGlobalClass: true
  },

  data: {
    cartoon: null
  },

  lifetimes: {
    attached() {
      this.drawer = this.selectComponent('#drawer')
    }
  },

  methods: {

    open(cartoon) {
      this.setData({ cartoon }, () => {
        this.drawer.open()
      })
    },

    close() {
      this.drawer.close()
    },

    async buttonHandler() {
      wx.showLoading({ title: '加载中'})
      const mid = this.data.cartoon.ID
      const { data } = await App.$api.cartoon.getUrlKey(mid)
      wx.hideLoading()
      if (data.status === 'ok') {
        if (data.data.urlkey) {
          const { urlkey } = data.data
          this.triggerEvent('read', { mid, urlkey })
        } else {
          wx.showToast({ title: data.data.errormessage, icon: 'none' })
        }
      }
    }
  }
})

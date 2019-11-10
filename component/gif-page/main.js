Component({

  options: {
    addGlobalClass: true
  },

  properties: {

    gifId: {
      type: Number,
      value: ''
    },

    placeholders: {
      type: Array,
      value: []
    }
  },

  data: {
    values: [],
    gifUrl: ''
  },

  attached() {
    console.info(this.data)
    this.buttonHandler()
  },

  methods: {
    inputHandler(e) {
      const { value } = e.detail
      const { key } = e.currentTarget.dataset
      this.setData({ [`values[${key}]`]: value })
    },

    buttonHandler() {
      const { gifId, values, placeholders } = this.data
      const input = Array(placeholders.length).fill(0).map((v, k) => {
        return values[k] || placeholders[k]
      })
      wx.showLoading({ title: '动图生成中' })
      App.$api.proxy.createGif(gifId, input).then(({ data }) => {
        if (data.status === 'ok') {
          const gifURL = data.data.path
          this.setData({ gifURL })
        }
      }).finally(() => wx.hideLoading())
    },

    save() {
      const { gifURL } = this.data
      if (gifURL) {
        App.$utils.saveNetPhoto(gifURL).then(() => {
          wx.showToast({ title: '保存成功' })
        })
      }
    }
  }
})
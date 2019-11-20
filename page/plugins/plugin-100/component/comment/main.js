Component({

  properties: {
    no: Number
  },

  data: {
    list: [],
    loadEnd: false
  },

  observers: {
    no(no) {
      if (!no) return
      this.nextpagetoken = null
      this.setData({ list: [], loadEnd: false })
      this.getComment()
    }
  },

  methods: {

    getComment() {
      const { no } = this.data
      const { nextpagetoken } = this
      wx.showLoading({ title: '加载中' })
      App.$api.yudans.getComment({ no, nextpagetoken }).then(({ data }) => {
        if (data.status !== 'ok') return
        const dataObj = {}
        dataObj.list = this.data.list.concat(data.data.comments)
        dataObj.loadEnd = !data.data.token
        this.nextpagetoken = data.data.token
        this.setData(dataObj)
      }).finally(() => wx.hideLoading())
    },

    getNextPage() {
      if (this.nextpagetoken) {
        this.getComment()
      }
    },

    imageErrorHandler(e) {
      
    }
  }
})

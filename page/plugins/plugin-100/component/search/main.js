Component({

  options: {
    addGlobalClass: true
  },

  properties: {
    currentNo: {
      type: Number,
      value: 0
    }
  },

  data: {
    keyword: '',
    keywordOpen: false,
    list: [],
    loadEnd: false
  },

  attached() {
    const page = this.page = 1
    const pagesize = this.pagesize = 10
    const { keyword } = this.data

    this.drawer = this.selectComponent('#drawer')
    this.getList({ page, pagesize, keyword }).then(() => {
      this.triggerEvent('init')
    })
  },

  methods: {

    inputHandler(e) {
      const { key } = e.currentTarget.dataset
      const { value } = e.detail
      this.setData({ [key]: value })
      this.searchInputEnterHandler()
    },

    open() {
      this.drawer.open()
    },

    close(e) {
      this.drawer.close()
    },

    scrollHandler() {
      if (this.data.loadEnd) return
      const { page, pagesize } = this
      const { keyword, keywordOpen } = this.data
      const reqBody = {}
      reqBody.page = page + 1
      reqBody.pagesize = pagesize
      if (keywordOpen) reqBody.keyword = keyword
      this.getList(reqBody)
    },

    searchInputEnterHandler() {
      const { pagesize } = this
      const { keyword } = this.data
      const reqBody = { pagesize, page: 1 }
      if (keyword) reqBody.keyword = keyword
      this.getList(reqBody, false).then(() => {
        this.setData({ keywordOpen: !!keyword })
      })
    },

    getList(body, concat = true) {
      wx.showLoading({ title: '加载中' })
      return App.$api.yudans.getList(body).then(({ data }) => {
        if (data.status !== 'ok') return
        const { page, pagesize, list, total } = data.data
        const dataObj = {}
        this.page = page
        this.total = total
        this.pagesize = pagesize
        dataObj.list = concat ? this.data.list.concat(list) : list.slice(0)
        dataObj.loadEnd = total <= dataObj.list.length
        this.setData(dataObj)
      }).finally(() => wx.hideLoading())
    },

    songTapHandler(e) {
      this.triggerEvent('tapsong', e.detail)
    }
  }
})
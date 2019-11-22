Page({

  data: {
    init: false,
    cates: [],
    filter: {},
    sortor: {},
    body: {
      sort: 0,
      tagid: 0,
      areaid: 0,
      status: 0,
      usergroup: 0
    },
    list: [],
    loadEnd: false
  },

  onLoad() {
    wx.showLoading({ title: '加载中' })
    Promise.all([
      this.init()
    ]).then(() => {
      this.setData({ init: true })
      this.bounce = this.selectComponent('#bounce')
      this.filterModal = this.selectComponent('#filter')
    }).finally(() => {
      wx.hideLoading()
    })
  },

  async onPullDownRefresh() {
    await this.refreshList()
    wx.stopPullDownRefresh()
  },

  async init() {
    const page = this.page = 1
    const pagesize = this.pagesize = 20
    await this.getOptions()
    await this.getList(page, pagesize)
  },

  async getOptions() {
    const { data } = await App.$api.cartoon.getOptions()
    if (data.status === 'ok') {
      const sort = data.data.sortor[1].id
      this.setData(Object.assign({
        'body.sort': sort
      }, data.data))
    }
  },

  async getList(page, pagesize, cover = false) {
    const reqBody = Object.assign({ page, pagesize }, this.data.body)
    const { data } = await App.$api.cartoon.getList(reqBody)
    if (data.status === 'ok') {
      const dataObj = {}
      dataObj.list = cover ? data.data.UpdateComicItems : this.data.list.concat(data.data.UpdateComicItems)
      dataObj.loadEnd = data.data.Count <= dataObj.list.length
      this.page = page
      this.setData(dataObj)
    }
  },

  setBody(obj) {
    const dataObj = {}
    Object.keys(obj).forEach(key => {
      dataObj[`body.${key}`] = obj[key]
    })
    this.setData(dataObj)
    this.refreshList()
  },

  onSelectCate(e) {
    const { id } = e.detail
    this.setBody({ tagid: id })
  },

  onSelectSort(e) {
    const { id } = e.detail
    this.setBody({ sort: id })
  },

  onFilterConfirm(e) {
    const { value } = e.detail
    console.info(value)
    this.setBody(value)
  },

  openFilterModal() {
    this.filterModal.open()
  },

  openBounce(e) {
    const cartoon = e.detail.data
    this.bounce.open(cartoon)
  },

  async onScrollBottom() {
    if (this.data.loadEnd) return
    const { page, pagesize } = this
    wx.showLoading({ title: '加载中' })
    await this.getList(page + 1, pagesize)
    wx.hideLoading()
  },

  async refreshList() {
    const { pagesize } = this
    wx.showLoading({ title: '加载中' })
    await this.getList(1, pagesize, true)
    wx.hideLoading()
  },

  openCartoonDetail(e) {
    const { urlkey, mid } = e.detail
    const url = `./detail/main?mid=${mid}&urlkey=${urlkey}`
    wx.navigateTo({ url })
  }
})

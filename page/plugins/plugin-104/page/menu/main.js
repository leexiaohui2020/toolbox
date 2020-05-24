Page({
  
  data: {

    // 食材分类
    menu: [],

    // 食材分类详情弹窗数据
    menuDrawer: {
      title: '',
      items: []
    }
  },

  onLoad() {
    // 获取食材分类弹窗实例
    this.menuDrawer = this.selectComponent('#items')
    this.getMenu()
  },

  // 获取食材分类
  async getMenu() {
    wx.showLoading({ title: '正在加载' })
    const { data: res } = await App.$api.shipu.getMenu()
    wx.hideLoading()
    if (res.status === 'ok') {
      this.setData({ menu: res.data })
    }
  },

  // 打开食材分类弹窗
  async openMenuDrawer(e) {
    wx.showLoading({ title: '正在加载' })
    const { id } = e.currentTarget.dataset
    const { data: res } = await App.$api.shipu.getMenuItem(id)
    wx.hideLoading()
    if (res.status === 'ok') {
      this.setData({
        'menuDrawer.title': res.data.title,
        'menuDrawer.items': res.data.list
      }, () => this.menuDrawer.open())
    }
  },

  // 前往食材做法大全页面
  gotoItemDetail(e) {
    const { id, title } = e.currentTarget.dataset
    wx.navigateTo({ url: `../detail/main?id=${id}&title=${title}` })
  }
})

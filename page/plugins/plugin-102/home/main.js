Page({

  data: {

    // Picker列表
    pickers: [
      // 分类
      {
        id: 'type',
        placeholder: '分类',
        options: ['恋爱', '学业', '健康', '家庭', '事业', '将来', '财富', '生活', '祈福'],
        value: ''
      },
      // 城市
      {
        id: 'city',
        placeholder: '地址',
        options: [
          "北京市", "天津市", "河北省", "山西省", "内蒙古", "辽宁省", "吉林省", "黑龙江", "上海市",
          "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省",
          "广东省", "广西省", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏", "陕西省",
          "甘肃省", "青海省", "宁夏", "新疆", "台湾省", "香港", "澳门", "不详"
        ],
        value: ''
      },
      // 出生
      {
        id: 'born',
        mode: 'date',
        placeholder: '出生',
        value: ''
      },
      // 性别
      {
        id: 'gender',
        placeholder: '性别',
        options: ['男', '女'],
        value: ''
      },
      // 星座
      {
        id: 'conste',
        placeholder: '星座',
        options: ["白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座", "水瓶座", "双鱼座"],
        value: ''
      }
    ],
    // 当前年份
    currentYear: new Date().getFullYear(),
    // 许愿人姓名
    name: '',
    // 许愿内容
    content: '',

    // 许愿列表
    wishList: [],
    // 许愿总数
    wishTotal: 0,
    wishDetailIndex: -1
  },

  onLoad() {

    // 创建插屏广告
    if (wx.createInterstitialAd) {
      const interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-138aa5333f7650da'
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
      this.interstitialAd = interstitialAd
    }

    // 获取许愿表单弹窗实例
    this.wishDrawer = this.selectComponent('#wish')
    // 获取许愿详情弹窗示例
    this.detailDrawer = this.selectComponent('#detail')
    this.getWishList()
  },

  // 展示插屏广告
  showInterstitialAd() {
    return this.interstitialAd.show().catch(e => {
      console.info('[许愿树插屏广告报错]', e.errMsg)
    })
  },

  openWishDrawer() {
    this.wishDrawer.open()
  },

  pickerChangeHandler(e) {
    const { value } = e.detail
    const { id } = e.currentTarget.dataset
    const item = this.data.pickers.find(v => v.id === id)
    const index = this.data.pickers.findIndex(v => v.id === id)
    this.setData({
      [`pickers[${index}].value`]: item.mode === 'date' ? value : item.options[value]
    })
  },

  inputHandler(e) {
    const { value } = e.detail
    const { id } = e.currentTarget.dataset
    this.setData({ [id]: value })
  },

  submitHandler() {
    const query = {}
    const showErr = title => wx.showToast({ icon: 'none', title })

    query.userId = App.$user.$data.userId
    if (!query.userId) return showErr('请登录')

    for (const item of this.data.pickers) {
      if (!item.value) return showErr(`请选择${item.placeholder}`)
      query[item.id] = item.value
    }
    
    if (!this.data.name) return showErr('请填写许愿人姓名')
    if (!this.data.content.trim()) return showErr('请填写祝福纸条内容')

    query.name = this.data.name
    query.content = this.data.content.trim()

    // 文本安全检测
    App.$utils.msgSecCheck([query.name, query.content].join('\n'), async () => {
      const { data: res } = await App.$api.wish.push(query)
      if (res.status !== 'ok') return showErr(res.errmsg)
      wx.showToast({ title: '许愿成功' })
      this.resetWishDrawer()
      this.showInterstitialAd()
      this.getWishList()
    })
  },

  // 重置许愿表单内容并关闭弹窗
  resetWishDrawer() {
    this.setData({
      name: '',
      content: '',
      ['pickers[0].value']: '',
      ['pickers[1].value']: '',
      ['pickers[2].value']: '',
      ['pickers[3].value']: '',
      ['pickers[4].value']: '',
    })
    this.wishDrawer.close()
  },

  // 获取最后10个发布的愿望
  async getWishList() {
    const { data: res } = await App.$api.wish.list({ pagesize: 12 })
    if (res.status === 'ok') {
      this.setData({
        wishList: res.data.list,
        wishTotal: res.data.total
      })
    }
  },

  // 打开许愿详情弹窗
  openDetailDrawer(e) {
    const { index } = e.currentTarget.dataset
    this.setData({ wishDetailIndex: index })
    this.detailDrawer.open()
  },

  // 跳转到许愿列表页面
  linkToListPage() {
    wx.navigateTo({ url: '../detail/main' })
  }
})

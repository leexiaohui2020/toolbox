Page.createTool({

  toolId: 943,
  toolName: '印章图案生成器',
  toolCate: [105],
  toolCreatedAt: new Date('2020/05/23'),
  toolCover: '/img/cover/943.png',

  data: {
    // 图章文字
    content: '',
    // 文字字体
    fonts: [
      { id: 'F050', text: '经典繁印篆' },
      { id: 'F055', text: '经典繁方篆' },
      { id: 'F056', text: '雅圆古印体' },
      { id: 'F051', text: '王汉宗印篆体' },
      { id: 'F057', text: '白舟篆古印体' },
      { id: 'F058', text: '白舟印相体' },
      { id: 'F007', text: '黄令东齐伋体' },
      { id: 'F006', text: '黄令东齐伋复刻体' },
      { id: 'F004', text: '新叶念体' },
      { id: 'F049', text: '全字库正楷体' },
      { id: 'F036', text: '贤二体' },
      { id: 'F034', text: '卓健橄榄简体' },
      { id: 'F009', text: '清松手写体' },
      { id: 'F013', text: '手书体' }
    ],
    fontSelected: 0,
    // 图章样式
    styles: [
      { id: 'S01', text: '印章样式一', img: 'http://www.atoolbox.net/Images/Seal/Sample-01.png' },
      { id: 'S02', text: '印章样式二', img: 'http://www.atoolbox.net/Images/Seal/Sample-02.png' },
      { id: 'S03', text: '印章样式三', img: 'http://www.atoolbox.net/Images/Seal/Sample-03.png' },
      { id: 'S05', text: '印章样式四', img: 'http://www.atoolbox.net/Images/Seal/Sample-04.png' },
      { id: 'S06', text: '印章样式五', img: 'http://www.atoolbox.net/Images/Seal/Sample-05.png' },
      { id: 'S07', text: '印章样式六', img: 'http://www.atoolbox.net/Images/Seal/Sample-06.png' },
      { id: 'S08', text: '印章样式七', img: 'http://www.atoolbox.net/Images/Seal/Sample-07.png' },
      { id: 'S12', text: '印章样式八', img: 'http://www.atoolbox.net/Images/Seal/Sample-08.png' },
      { id: 'S13', text: '印章样式九', img: 'http://www.atoolbox.net/Images/Seal/Sample-09.png' },
      { id: 'S14', text: '印章样式十', img: 'http://www.atoolbox.net/Images/Seal/Sample-10.png' },
      { id: 'S15', text: '印章样式十一', img: 'http://www.atoolbox.net/Images/Seal/Sample-11.png' },
      { id: 'S16', text: '印章样式十二', img: 'http://www.atoolbox.net/Images/Seal/Sample-12.png' }
    ],
    styleSelected: 0,
    // 简体繁体
    st: [
      { id: 'gb2312', text: '简体' },
      { id: 'big5', text: '繁体' }
    ],
    stSelected: 0,

    imgDataUrl: ''
  },

  onLoad() {
    this.styleDrawer = this.selectComponent('#style')

    // 创建激励式广告
    if (wx.createRewardedVideoAd) {
      this.videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-5bac4a3026578dd5'
      })
      this.videoAd.onLoad(() => {})
      this.videoAd.onError(err => {
        console.info('error:', err)
      })
      this.videoAd.onClose(res => {
        if (res && res.isEnded) {
          this.savePhoto()
        }
      })
    }
  },

  // 输入简体
  inputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    this.setData({ [key]: value })
  },

  // 生成图章
  async submitHandler() {
    const { data } = this
    const font = data.fonts[data.fontSelected] && data.fonts[data.fontSelected].id
    const style = data.styles[data.styleSelected] && data.styles[data.styleSelected].id
    const st = data.st[data.stSelected] && data.st[data.stSelected].id
    const { content } = data
    const showErr = title => wx.showToast({ icon: 'none', title })

    if (!font) return showErr('请选择文字字体')
    if (!style) return showErr('请选择图章样式')
    if (!st) return showErr('请选择简体繁体')
    if (!content || content.length !== 4) return showErr('图章文字必须是4个汉字')

    wx.showLoading({ title: '正在生成' })
    const { data: res } = await App.$api.proxy.getSealImage({ font, style, st, content })
    wx.hideLoading()
    if (typeof res === 'string') {
      this.setData({ imgDataUrl: res }, () => {
        wx.pageScrollTo({ selector: '.result' })
      })
    }
  },

  showStyleDrawer() {
    this.styleDrawer.open()
  },

  showVideoAd() {
    if (this.videoAd) {
      this.videoAd.show().catch(err => {
        this.videoAd.load().then(() => this.videoAd.show()).catch(err => {
          wx.showModal({
            title: '提示',
            content: '广告加载失败',
            showCancel: false
          })
        })
      })
    }
  },

  async savePhoto() {
    if (!this.data.imgDataUrl) return
    const filePath = await App.$utils.base64ToTempFilePath(this.data.imgDataUrl.split(',')[1], 'png')
    await App.$utils.savePhoto(filePath)
  }
})

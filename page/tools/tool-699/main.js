import {
  encodeMessage,
  decodeMessage
} from './stega.js'

Page.createTool({
  toolId: 699,
  toolName: '图片隐写术',
  toolCate: [105],
  toolCreatedAt: new Date('2020/5/17'),
  toolCover: 'https://s1.ax1x.com/2020/05/25/t9S4de.md.png',

  data: {
    canvasWidth: 100,
    canvasHeight: 100,
    imageSrc: null,
    hideText: '',
    pass: '',
    geImageSrc: null,
    showImage: false
  },

  onLoad() {
    console.info(123)
    // 获取Canvas实例
    const query = wx.createSelectorQuery()
    console.info(query)
    query.select('.canvas').exec(function(e) {
      console.info(e)
    })
  },

  // 上传图像
  async uploadImage() {
    const res = await App.$utils.chooseImageSecu()
    if (res.errMsg !== 'chooseImage:ok') return
    const imageSrc = res.tempFilePaths[0]
    const info = await App.$utils.getImageInfo(imageSrc)
    if (info.errMsg !== 'getImageInfo:ok') return

    this.setData({
      imageSrc,
      hideText: '',
      geImageSrc: null,
      canvasWidth: info.width,
      canvasHeight: info.height
    })

    const ctx = wx.createCanvasContext('canvas', this)
    ctx.drawImage(imageSrc, 0, 0, info.width, info.height)
    ctx.draw()
  },

  inputHandler(e) {
    const { value } = e.detail
    const { id } = e.currentTarget.dataset
    this.setData({ [id]: value })
  },

  // 生成隐藏图片
  encodeHandler() {
    const { data } = this
    if (!data.imageSrc) return
    // 获取图像点阵
    wx.canvasGetImageData({
      canvasId: 'canvas',
      x: 0,
      y: 0,
      width: data.canvasWidth,
      height: data.canvasHeight,
      success: (res) => {
        const pass = App.$utils.CryptoJS.SHA256(data.pass).words
        const colors = encodeMessage(res.data, pass, data.hideText)
        // 编码后的图像点阵绘制到画布
        wx.canvasPutImageData({
          canvasId: 'canvas',
          data: colors,
          x: 0,
          y: 0,
          width: data.canvasWidth,
          height: data.canvasHeight,
          success: () => {
            // 画布转临时文件路径
            wx.canvasToTempFilePath({
              canvasId: 'canvas',
              x: 0,
              y: 0,
              width: data.canvasWidth,
              height: data.canvasHeight,
              success: res => {
                this.setData({
                  geImageSrc: res.tempFilePath
                }, () => {
                  wx.createSelectorQuery().select('.preview')
                    .boundingClientRect(rect => {
                      wx.pageScrollTo({
                        scrollTop: rect.top
                      })
                  }).exec()
                })
              }
            })
          }
        })
      }
    })
  },

  // 保存图片到相册
  async savePhoto() {
    const { geImageSrc } = this.data
    if (geImageSrc) {
      await App.$utils.savePhoto(geImageSrc)
    }
  },

  // 解析隐藏内容
  decodeHandler() {
    const { data } = this
    if (!data.imageSrc) return
    // 获取图像点阵
    wx.canvasGetImageData({
      canvasId: 'canvas',
      x: 0,
      y: 0,
      width: data.canvasWidth,
      height: data.canvasHeight,
      success: (res) => {
        const pass = App.$utils.CryptoJS.SHA256(data.pass).words
        const message = decodeMessage(res.data, pass)
        this.setData({
          hideText: message 
            ? `隐藏的内容：\n${message}`
            : '密码错误或该图片没有隐藏内容'
        })
      }
    })
  },

  // 查看图片
  switchImageShow() {
    this.setData({
      showImage: !this.data.showImage
    })
  }
})

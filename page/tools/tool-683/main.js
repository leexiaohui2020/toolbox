import * as wordcard from 'wordcard'

Page.createTool({

  toolId: 683,
  toolName: '二维码生成',
  toolCate: [107],

  data: {
    word: '',
    sizeList: [
      { name: '64x64', size: 64 },
      { name: '128x128', size: 128 },
      { name: '256x256', size: 256 },
      { name: '512x512', size: 512 },
    ],
    sizeIndex: 0,
    base64Result: '',
    tempFilePath: '',
    wordcard
  },

  inputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    this.setData({ [key]: value })
  },

  buttonHandler() {
    const { word, sizeIndex, sizeList } = this.data
    const { size } = sizeList[sizeIndex]
    console.info(size)
    App.$utils.Qrcode.api.draw(word, 'canvas', size, size)
    wx.canvasToTempFilePath({
      width: size,
      height: size,
      canvasId: 'canvas',
      success: (res) => {
        const { tempFilePath } = res
        this.setData({ tempFilePath }, () => {
          wx.pageScrollTo({ selector: '#sizepicker' })
        })
      }
    })
  },

  clear() {
    this.setData({ tempFilePath: '' })
  },

  save() {
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
      success: (res) => {
        const filePath = this.data.tempFilePath
        wx.saveImageToPhotosAlbum({ filePath })
      },
      fail: () => wx.showModal({
        title: '提示',
        content: '图片保存失败，请打开设置查看授权',
        showCancel: false
      })
    })
  }
})

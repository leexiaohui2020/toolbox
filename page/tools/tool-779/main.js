Page.createTool({

  toolId: 779,
  toolName: '九宫切图',
  toolCate: [105],

  data: {
    width: 0,
    height: 0,
    source: '',
    cutPaths1: [],
    cutPaths2: [],
    cutPaths3: [],
    sourceMode: false
  },

  chooseImage() {
    App.$utils.chooseImageSecu({
      count: 1,
    }).then(res => {
      const source = res.tempFilePaths[0]
      wx.showLoading({ title: '图片处理中' })
      this.cutImage(source, cutPaths => {
        this.setData({
          source,
          cutPaths1: cutPaths.slice(0, 3),
          cutPaths2: cutPaths.slice(3, 6),
          cutPaths3: cutPaths.slice(6, 9),
        })
        wx.hideLoading()
      }, e => console.info(e))
    })
  },

  cutImage(path, callback, onError) {
    wx.getImageInfo({
      src: path,
      success: (res) => {
        const { width, height } = res
        this.setData({ width, height }, () => {
          onGotImageInfo(width, height)
        })
      },
      fail: onError
    })

    const onGotImageInfo = (imgW, imgH) => {
      const ctx = wx.createCanvasContext('canvas')
      const cutWidth = imgW / 3
      const cutHeight = imgH / 3
      const cut = (pX, pY) => {
        const x = pX * cutWidth
        const y = pY * cutHeight
        App.$utils.canvasToTempFilePathDelay({
          x,
          y,
          width: cutWidth,
          height: cutHeight,
          canvasId: 'canvas',
          success: res => {
            onCutSuccess(res.tempFilePath, x, y)
          },
          fail: onError
        })
      }
      const cutPaths = []
      const onCutSuccess = (tmpPath, x, y) => {
        cutPaths.push({ src: tmpPath, x, y })
        if (cutPaths.length === 9) {
          callback(cutPaths)
        }
      }

      ctx.drawImage(path, 0, 0)
      ctx.draw(true, function() {
        for (let pY = 0; pY < 3; pY++) {
          for (let pX = 0; pX < 3; pX++) {
            cut(pX, pY)
          }
        }
      })
    }
  },

  saveCutImages() {
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
      success: () => {
        const { cutPaths1, cutPaths2, cutPaths3 } = this.data
        const list = cutPaths1.concat(cutPaths2).concat(cutPaths3)
        const next = () => {
          const file = list.shift()
          if (!file) return wx.hideLoading(), wx.showToast({ title: '保存完成' })
          wx.showLoading({ title: `正在保存：${9 - list.length}/9`})
          wx.saveImageToPhotosAlbum({ filePath: file.src, success: next })
        }
        next()
      },
      fail: () => wx.showModal({
        title: '提示',
        content: '图片保存失败，请打开设置查看授权',
        showCancel: false
      })
    })
  },

  toggleMode() {
    this.setData({ sourceMode: !this.data.sourceMode })
  }
})

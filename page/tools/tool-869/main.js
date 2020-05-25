Page.createTool({

  toolId: 869,
  toolName: '毒鸡汤',
  toolCate: [107],
  toolCreatedAt: new Date('2020/05/19'),
  toolCover: 'https://s1.ax1x.com/2020/05/25/t9SWqO.md.png',

  data: {
    showCanvas: false
  },

  onLoad() {
    console.info(1)
    // 获取打字机实例
    this.typing = this.selectComponent('#typing')
    this.getContent()
  },

  // 随机获取一句毒鸡汤
  async getContent() {
    const { data: res } = await App.$api.proxy.getArticleRandOne(4)
    if (res.status === 'ok' && res.data) {
      this.typing.play(this.content = res.data.atc_abstract)
    }
  },

  // 生成海报
  generatePoster() {
    if (!this.content) return
    const ctx = wx.createCanvasContext('poster', this)

    // 获取到画布的宽高
    const onGotCanvasSize = res => {
      const width = Math.ceil(res.width)
      const height = Math.ceil(res.height)
      const originWidth = 500
      const originHeight = 250
      
      // 计算 width 和 height 的最大公因数作为背景图片的宽高
      // const size = App.$utils.getCommonDivisor(width, height)
      const size = height
      
      // 循环绘制背景图片
      for (let left = 0; left < width; left += size) {
        for (let top = 0; top < height; top += size) {
          ctx.drawImage('./bg.png', left, top, size, size)
        }
      }

      // 绘制文字
      // 计算边距
      const mh =  width * 20 / originWidth
      const mv = height * 20 / originHeight
      const textWidth = width - 2 * mh
      const fontSize = width * 20 / originWidth
      const textArr = this.content.split('')
      let curTop = mv
      let curLeft = mh

      ctx.setFillStyle('#FFF')
      ctx.setFontSize(fontSize)
      ctx.setTextBaseline('top')

      while(textArr.length) {
        if (curLeft > mh + textWidth - fontSize) {
          curLeft = mh
          curTop += fontSize + 4
        }
        ctx.fillText(textArr.shift(), curLeft, curTop)
        curLeft += fontSize + 2
      }

      // 绘制一条水平虚线
      curTop += fontSize + mv
      ctx.setLineDash([4, 2])
      ctx.setStrokeStyle('#FFF')
      ctx.moveTo(mh, curTop)
      ctx.lineTo(mh + textWidth, curTop)
      ctx.stroke()

      // 绘制二维码，暂时用其他图片代替
      // 计算二维码高度
      curTop += mv
      const qrcodeSize = height - curTop - mv
      const qrcodeLeft = width - qrcodeSize - mh
      ctx.drawImage('./qrcode.png', qrcodeLeft, curTop, qrcodeSize, qrcodeSize)

      // 绘制一条垂直虚线
      ctx.moveTo(qrcodeLeft - mh, curTop)
      ctx.lineTo(qrcodeLeft - mh, curTop + qrcodeSize)
      ctx.stroke()

      // 绘制文本
      ctx.setFontSize(fontSize)
      const text = '识别二维码查看原文☞'
      const textMeasure = ctx.measureText(text)
      console.info(textMeasure)
      ctx.fillText(text, qrcodeLeft - 2 * mh - textMeasure.width, curTop + qrcodeSize - fontSize)

      ctx.draw(false, () => {
        this.setData({ showCanvas: true })
      })
    }

    wx.createSelectorQuery().select('.poster').boundingClientRect(onGotCanvasSize).exec()
  },

  // 保存至相册
  savePhoto() {
    wx.canvasToTempFilePath({
      canvasId: 'poster',
      success: res => {
        App.$utils.savePhoto(res.tempFilePath)
      }
    }, this)
  }
})

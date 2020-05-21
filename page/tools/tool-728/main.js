const showErr = title => wx.showToast({
  icon: 'none',
  title
})

Page.createTool({

  toolId: 728,
  toolName: '抽奖转盘',
  toolCate: [107],
  toolCreatedAt: new Date('2020/05/19'),
  toolCover: '/img/cover/728.png',

  data: {

    // 设置表单
    setting: {
      title: '',
      items: ['', '']
    },

    imgSrc: null,
    canvasAnimation: {}
  },

  onLoad() {
    // 获取抽奖设置弹窗实例
    this.settingDrawer = this.selectComponent('#setting')
    // 创建动画
    this.animating = false
    this.animation = wx.createAnimation({ duration: 5000, timingFunction: 'ease-out' })
  },

  // 打开抽奖设置弹窗
  openSettingDrawer() {
    this.settingDrawer.open()
  },

  // 新增抽奖奖项
  addItems() {
    const items = this.data.setting.items.slice(0)
    items.push('')
    this.setData({ ['setting.items']: items })
  },

  // 输入框监听
  inputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    this.setData({ [key]: value })
  },

  // 删除选项
  removeItem(e) {
    const items = this.data.setting.items.slice(0)
    const { index } = e.currentTarget.dataset
    items.splice(index, 1)
    if (items.length < 2) {
      wx.showToast({ icon: 'none', title: '至少保留两项' })
      return
    }
    this.setData({ ['setting.items']: items })
  },

  // 设置完成
  confirmHandler() {
    const { setting } = this.data
    const items = setting.items.map(v => v.trim()).filter(v => v)
    const colorArr = items.length & 1 ? ['#fff4d6', '#ffffff', '#fff0c8'] : ['#fff4d6', '#ffffff']
    if (items.length < 2) return showErr('至少设置两个奖项')
    
    const canvasOptions = {
      title: setting.title,
      items: items.map((text, index) => ({
        id: index,
        text,
        color: colorArr[index % colorArr.length]
      }))
    }

    this.renderCanvas(this.canvasOptions = canvasOptions)
  },

  // 渲染画布
  renderCanvas(opts) {
    // 获取到画布的宽高
    const onGotCanvasSize = res => {
      const width = res.width
      const height = res.height
      const margin = 20
      const ctx = wx.createCanvasContext('canvas', this)

      // 圆心和半径
      const ox = width / 2
      const oy = height / 2
      const r = (width - 2 * margin) / 2

      // 绘制最外层的圆
      ctx.beginPath()
      ctx.arc(ox, oy, r, 0, 2 * Math.PI)
      ctx.setStrokeStyle('#FFE08A')
      ctx.stroke()

      // 根据选项数量计算弧度
      const { items } = opts
      const arc = 2 * Math.PI / items.length
      // 文字与圆心的距离
      const textRadius = r - 30

      ctx.setFontSize(14)
      for (let i = 0; i < items.length; i++) {
        const angle = i * arc
        ctx.setFillStyle(items[i].color)
        ctx.beginPath()
        ctx.arc(ox, oy, r, angle, angle + arc, false)
        ctx.arc(ox, oy, 10, angle + arc, angle, true)
        ctx.stroke()
        ctx.fill()
        ctx.save()

        // 绘制奖品文字
        ctx.setFillStyle('#E5302F')
        ctx.translate(
          ox + Math.cos(angle + arc / 2) * textRadius,
          oy + Math.sin(angle + arc / 2) * textRadius
        )
        ctx.rotate(angle + arc / 2 + Math.PI / 2)
        ctx.fillText(items[i].text, -ctx.measureText(items[i].text).width / 2, 0)
        ctx.restore()
      }

      ctx.draw(false, () => {
        // 画布转图片临时路径
        wx.canvasToTempFilePath({
          canvasId: 'canvas',
          success: res => {
            this.setData({
              imgSrc: res.tempFilePath
            })
          }
        })
      })
      this.settingDrawer.close()
    }

    wx.createSelectorQuery().select('.canvas').boundingClientRect(onGotCanvasSize).exec()
  },

  // 点击了抽奖
  actionHandler() {
    if (!this.canvasOptions) return
    const items = this.canvasOptions.items
    // 随机抽，范围在 0 至 奖品数量 - 1
    const rand = Math.round(Math.random() * (items.length - 1))
    this.rotateFn(rand, () => {
      console.info('抽到了', items[rand])
    })
  },

  // 转盘旋转方法
  rotateFn(index, onFinish) {
    if (this.animating) return
    if (!this.canvasOptions) return
    const items = this.canvasOptions.items
    let angle = index * (360 / items.length) - (360 / (items.length * 2))
    angle = angle < 270 ? 270 - angle : 360 - angle + 270

    this.animating = onFinish
    this.animation.rotate(0).step({ duration: 0 })
    this.setData({ canvasAnimation: this.animation.export() }, () => {
      this.animation.rotate(angle + 1800).step()
      this.setData({ canvasAnimation: this.animation.export() })
    })
  },

  // 动画结束
  animationEndHandler() {
    if (typeof this.animating === 'function') {
      this.animating()
      delete this.animating
    }
  }
})

Component({

  options: {
    addGlobalClass: true
  },

  properties: {
    imgList: Array,
    imgIndex: {
      type: Number,
      value: 0
    }
  },

  data: {
    avatarURL: '',
    centerX: 130,
    centerY: 130,
    handleX: 180,
    handleY: 180,
    hatSize: 100,
    scale: 1,
    rotate: 0,
    scrollIndex: 0,
    canvasWidth: 0,
    canvasHeight: 0,
    result: ''
  },

  attached() {
    this.setImgIndex(this.data.imgIndex)
  },

  methods: {

    selectImage(e) {
      const { index } = e.currentTarget.dataset
      this.setImgIndex(index) 
    },

    chooseImage() {
      App.$utils.chooseImageSecu({ count: 1 }).then(res => {
        this.setAvatarURL(res.tempFilePaths[0])
      })
    },

    getWeiXinAvatar(e) {
      const { userInfo } = e.detail
      if (!userInfo) {
        return wx.showToast({ title: '获取失败', icon: 'none' })
      }
      wx.getImageInfo({
        src: userInfo.avatarUrl,
        success: res => {
          this.setAvatarURL(res.path)
        }
      })
    },

    randomChange() {
      const index = Math.round(Math.random() * this.data.imgList.length)
      this.setImgIndex(index)
      this.setData({ scrollIndex: index })
    },

    generate() {
      const scale = this.scale
      const rotate = this.rotate
      const centerX = this.centerX
      const centerY = this.centerY
      const avatarURL = this.data.avatarURL
      const imgURL = this.data.imgList[this.data.imgIndex]
      if (!avatarURL || !imgURL) return
      const ctx = wx.createCanvasContext('canvas', this)
      ctx.drawImage(avatarURL, 0, 0, 260, 260)
      wx.showLoading({ title: '图片合成中' })
      wx.getImageInfo({
        src: imgURL,
        success: res => {
          const size = 100 * scale
          ctx.translate(centerX, centerY)
          ctx.rotate(rotate * Math.PI / 180)
          ctx.drawImage(res.path, -size/2, -size/2, size, size)
          ctx.draw(false, () => {
            wx.canvasToTempFilePath({
              canvasId: 'canvas',
              success: res => {
                const result = res.tempFilePath
                this.setData({ result })
              },
              complete() {
                wx.hideLoading()
              }
            }, this)
          })
        }
      })
    },

    setAvatarURL(avatarURL) {
      this.setData({ avatarURL })
    },

    setImgIndex(imgIndex) {
      this.setData({
        imgIndex,
        centerX: 130,
        centerY: 130,
        handleX: 180,
        handleY: 180,
        scale: 1,
        rotate: 0
      })
      this.centerX = this.data.centerX
      this.centerY = this.data.centerY
      this.handleX = this.data.handleX
      this.handleY = this.data.handleY
      this.scale = this.data.scale
      this.rotate = this.data.rotate
      this.startX = 0
      this.startY = 0
      this.touchTarget = null
    },

    onTouchStart(e) {
      const { id } = e.target.dataset
      if (id) {
        this.touchTarget = id
        this.startX = e.touches[0].clientX
        this.startY = e.touches[0].clientY
      }
    },

    onTouchEnd() {
      this.centerX = this.data.centerX
      this.centerY = this.data.centerY
      this.handleX = this.data.handleX
      this.handleY = this.data.handleY
      this.rotate = this.data.rotate
      this.scale = this.data.scale
      this.touchTarget = null
    },

    onTouchMove(e) {
      if (!this.touchTarget) return
      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      const moveX = currentX - this.startX
      const moveY = currentY - this.startY
      const dataObj = {}
      if (this.touchTarget === 'hat') {
        dataObj.centerX = this.data.centerX + moveX
        dataObj.centerY = this.data.centerY + moveY
        dataObj.handleX = this.data.handleX + moveX
        dataObj.handleY = this.data.handleY + moveY
      } else if (this.touchTarget === 'handle') {
        dataObj.handleX = this.data.handleX + moveX
        dataObj.handleY = this.data.handleY + moveY
        const diffXBefore = this.handleX - this.centerX
        const diffYBefore = this.handleY - this.centerY
        const diffXAfter = dataObj.handleX - this.centerX
        const diffYAfter = dataObj.handleY - this.centerY
        const distanceBefore = App.$utils.computeDistance(diffXBefore, diffYBefore, 0, 0)
        const distanceAfter = App.$utils.computeDistance(diffXAfter, diffYAfter, 0, 0)
        const angleBefore = Math.atan2(diffYBefore, diffXBefore) / Math.PI * 180
        const angleAfter = Math.atan2(diffYAfter, diffXAfter) / Math.PI * 180
        dataObj.scale = distanceAfter / distanceBefore * this.scale
        dataObj.rotate = angleAfter - angleBefore + this.rotate
      }

      this.startX = currentX
      this.startY = currentY
      this.setData(dataObj)
    },

    closeDialog() {
      this.setData({ result: '' })
    },

    saveResult() {
      if (this.data.result) {
        App.$utils.savePhoto(this.data.result)
      }
    }
  }
})

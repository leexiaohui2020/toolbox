Component({

  externalClasses: ['custom'],

  properties: {
    adUnitId: String
  },

  attached() {
    // 创建激励式广告并绑定在当前页面
    const currentPages = getCurrentPages()
    const currentPage = currentPages[currentPages.length - 1]

    if (!currentPage.videoAd && wx.createRewardedVideoAd) {
      const videoAd = wx.createRewardedVideoAd({
        adUnitId: this.data.adUnitId
      })
      videoAd.onLoad(() => {})
      videoAd.onError(() => {})
      videoAd.onClose(res => {
        if (res && res.isEnded) {
          this.triggerEvent('ended')
        }
      })
      this.videoAd = currentPage.videoAd = videoAd
    }
  },

  methods: {
    showVideoAd() {
      this.videoAd && this.videoAd.show().catch(() => {
        this.videoAd.show().catch(() => {
          wx.showModal({
            title: '提示',
            content: '广告加载失败',
            showCancel: false
          })
        })
      })
    }
  }
})
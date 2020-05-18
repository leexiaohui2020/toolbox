Component({

  externalClasses: ['custom'],

  properties: {
    data: Object
  },

  methods: {

    // 点赞或取消点赞操作
    async likeHandler() {
      const userId = App.$user.$data.userId
      const wishId = this.data.data._id
      const showErr = title => wx.showToast({ icon: 'none', title })

      if (!userId) return showErr('请登录') 
      if (!wishId) return showErr('请选择要祝福的愿望')

      const { data: res } = await App.$api.wish.like({ userId, wishId })
      wx.showModal({
        title: '许愿树',
        content: res.status === 'ok' ? '您的祝福已经送出，感谢您的祝福！' : res.errmsg,
        showCancel: false
      })
      if (res.status === 'ok') {
        this.setData({
          ['data.likes']: this.data.data.likes.concat([userId])
        })
      }
    }
  }
})

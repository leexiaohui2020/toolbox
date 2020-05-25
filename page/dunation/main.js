Page({

  data: {
    showBack: false,
    dunation: [
      { name: '马*维', amount: '6.00元' },
      { name: '廖*斌', amount: '8.80元' },
      { name: '*鹏', amount: '10.00元' },
    ]
  },

  switchCard() {
    this.setData({ showBack: !this.data.showBack })
  },

  // 保存二维码
  savePhoto(e) {
    const { photo } = e.currentTarget.dataset
    App.$utils.saveNetPhoto(photo)
  }
})
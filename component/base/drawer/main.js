Component({

  externalClasses: [
    'custom',
    'custom-cover'
  ],

  properties: {

    width: {
      type: String,
      value: '600rpx',
    },

    height: {
      type: String,
      value: '80%'
    },

    round: {
      type: Boolean,
      value: false
    },

    direction: {
      type: String,
      value: 'left'
    },

    show: {
      type: String,
      value: 'close'
    }
  },

  methods: {

    open() {
      this.setData({ show: 'open' })
    },
    close() {
      this.setData({ show: '' })
    },
    onTransitionEnd() {
      if (this.data.show !== 'open') {
        this.setData({ show: 'close' })
      }
    },

    catchDrawerTap() {}
  }
})

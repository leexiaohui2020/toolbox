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
      this.setData({ show: 'open' }, () => {
        this.triggerEvent('opened')
      })
    },
    close() {
      this.setData({ show: '' }, () => {
        this.triggerEvent('closed')
      })
    },
    onTransitionEnd() {
      if (this.data.show !== 'open') {
        this.setData({ show: 'close' })
      }
    },

    catchDrawerTap() {}
  }
})

Component({
  options: {
    multipleSlots: true
  },
  externalClasses: ['custom', 'custom-content'],
  properties: {
    label: String,
    labelWidth: {
      type: String,
      value: 220
    },
    labelHide: {
      type: Boolean,
      value: false
    },
    align: {
      type: String,
      value: 'left'
    },
    link: {
      type: String,
      value: ''
    }
  },

  methods: {
    tapHandler() {
      const url = this.data.link
      url && wx.navigateTo({ url })
    }
  }
})

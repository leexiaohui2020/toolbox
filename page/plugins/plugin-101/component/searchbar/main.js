Component({

  options: {
    addGlobalClass: true
  },

  properties: {
    value: {
      type: String,
      value: ''
    }
  },

  methods: {

    inputHandler(e) {
      const { value } = e.detail
      this.setData({ value })
    },

    confirmHandler() {
      const { value } = this.data
      this.triggerEvent('confirm', { value })
    },

    clear() {
      this.setData({ value: '' })
      this.confirmHandler()
    }
  }
})

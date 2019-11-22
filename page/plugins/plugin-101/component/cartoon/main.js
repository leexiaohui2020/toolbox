Component({

  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  data: {
    loaded: false
  },

  methods: {
    onImageLoad() {
      this.setData({ loaded: true })
    },

    tapHandler() {
      const { data } = this.data
      this.triggerEvent('ontap', { data })
    }
  }
})
Component({

  properties: {

    filter: {
      type: Array,
      value: []
    },

    value: {
      type: Object,
      value: {}
    }
  },

  lifetimes: {
    attached() {
      this.initValue()
      this.drawer = this.selectComponent('#drawer')
    }
  },

  methods: {

    initValue() {
      const value = {}
      this.data.filter.forEach(item => {
        value[item.id] = this.data.value[item.id] || 0
      })
      this.setData({ value })
      this.valueStore = Object.assign({}, value)
    },

    selectHandler(e) {
      const { key, id } = e.currentTarget.dataset
      this.setData({ [`value.${key}`]: +id })
    },

    reset() {
      const value = this.valueStore
      this.setData({ value })
    },

    confirm() {
      const { value } = this.data
      this.triggerEvent('confirm', { value })
      this.valueStore = Object.assign({}, value)
      this.close()
    },

    open() {
      this.drawer.open()
    },
    close() {
      this.drawer.close()
    }
  }
})

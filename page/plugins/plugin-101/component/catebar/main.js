Component({

  properties: {
    cates: {
      type: Array,
      value: []
    },

    selectId: {
      type: Number,
      value: 0
    }
  },

  methods: {
    selectHandler(e) {
      const { id } = e.currentTarget.dataset
      this.setData({ selectId: +id })
      this.triggerEvent('select', { id: +id })
    }
  }
})

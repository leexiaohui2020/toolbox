const { createStorage } = App.$utils

export const storeHistory = createStorage('plugin-00_history', {

  methods: {

    next() {
      return () => {
        const len = storeHistory.length
        const index = this.index + 1
        return storeHistory.get(index < len ? index : 0)
      }
    },

    prev() {
      return () => {
        const len = storeHistory.length
        const index = this.index - 1
        return storeHistory.get(index >= 0 ? index : len - 1)
      }
    }
  }
})

export const storeLike = createStorage('plugin-00_like', {

  statics: {

    toggle() {
      return data => {
        const item = this.findOne({ no: data.no })
        console.info(item)
        item ? item.remove() : this.addOne(data)
        return this
      }
    },

    isLike() {
      return no => {
        return !!this.findOne({ no })
      }
    }
  }
})

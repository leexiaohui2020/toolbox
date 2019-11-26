const { createStorage } = App.$utils
export const storeHistory = createStorage('plugin-101/history', {

  statics: {

    lastRead() {
      return storeHistory.find().sort((a, b) => {
        return b.updateTime - a.updateTime
      })[0]
    }
  }
})

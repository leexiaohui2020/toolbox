import * as wordcard from 'wordcard'

Page({

  toolId: 660,
  toolName: 'UUID生成',

  data: {
    uuid: '',
    wordcard
  },

  copy() {
    App.$utils.copyText(this.data.uuid)
  },

  buttonHandler() {
    const uuid = this.createUUID()
    this.setData({ uuid })
  },

  createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0
      const v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
})
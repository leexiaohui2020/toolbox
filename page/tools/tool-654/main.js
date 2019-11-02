import keybord from 'keybord/main'

Page({

  toolId: 654,
  toolName: '计算器',
  
  data: {
    result: '',
    express: '',
    keybord: keybord.list
  },

  clickHandler(e) {
    const { id } = e.currentTarget.dataset
    const key = keybord.find(id)
    const express = key.exec()
    this.setData({
      express: express.toString(),
      result: express.toResult()
    })
  }
})

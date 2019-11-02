import markdown from 'markdown/main'

Page({

  toolId: 658,
  toolName: 'Markdown编辑器',

  data: {
    originalText: '',
    renderTree: null
  },

  inputHandler(e) {
    const originalText = e.detail.value
    this.setData({ originalText })
    this.render()
  },

  render() {
    const renderTree = markdown.render(this.data.originalText)
    this.setData({
      renderTree: renderTree.getTree()
    })
  }
})

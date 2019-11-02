import RenderTree from 'lib/tree.js'

export default {

  loaders: [
    require('loaders/title').default,
    require('loaders/order').default,
    require('loaders/list').default,
    require('loaders/code').default,
    require('loaders/section').default,
    require('loaders/bolder').default,
    require('loaders/italic').default,
  ],
  render(text) {
    const loaders = this.loaders
    const textList = text.split(/\r?\n/)
    textList.group = new Set()
    const renderTree = new RenderTree()
    textList.forEach((item, index) => {
      if (textList.group.has(index)) return
      textList.group.add(index)
      const renderNode = new RenderTree.RenderNode(item)
      renderTree.append(renderNode)
      loaders.forEach(v => {
        if (v.filter(renderNode, renderTree, textList, index)) {
          v.exec(renderNode, renderTree)
        }
      })
    })
    return renderTree
  }
}

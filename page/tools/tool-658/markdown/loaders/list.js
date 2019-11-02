class RenderList {
  constructor() {

  }
}

class RenderListItem {
  constructor() {

  }
}

export default {
  filter(node) {
    return /^(\+|\-)/.test(node.$text)
  },

  exec(node, tree) {
    node.type = new RenderListItem()
    node.$text = node.$text.replace(/^(\+|\-)\s?/, '')

    const parent = tree.getParentNode(node)
    if (parent && parent.type instanceof RenderList) return

    const previou = tree.getPrevNode(node)
    if (previou && previou.type instanceof RenderList) {
      tree.append(node, previou)
      return
    }

    const newNode = new tree.RenderNode('')
    newNode.type = new RenderList()
    tree.append(newNode)
    tree.append(node, newNode)
  }
}
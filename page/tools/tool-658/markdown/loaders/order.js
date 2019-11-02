import createWXML from '../lib/wxml'

class RenderOrder {
  constructor(node) {
    this.wxml = createWXML(node, {
      staticClass: ['order']
    })
  }
}

class RenderOrderItem {
  constructor(node) {
    this.wxml = createWXML(node, {
      staticClass: ['order-item']
    })
  }
}

export default {
  filter(node) {
    return /^\d+\./.test(node.$text)
  },

  exec(node, tree) {
    node.type = new RenderOrderItem(node)
    node.$text = node.$text.replace(/^\d+\.\s?/, '')

    const parent = tree.getParentNode(node)
    if (parent && parent.type instanceof RenderOrder) return

    const previou = tree.getPrevNode(node)
    if (previou && previou.type instanceof RenderOrder) {
      tree.append(node, previou)
      return
    }

    const newNode = new tree.RenderNode('')
    newNode.type = new RenderOrder(newNode)
    tree.append(newNode)
    tree.append(node, newNode)
  }
}
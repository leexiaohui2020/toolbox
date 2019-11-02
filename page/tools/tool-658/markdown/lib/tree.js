import RenderNode from 'node'

class RenderTree extends RenderNode {
  static RenderNode = RenderNode
  get $tree() {
    return this.children
  }
  get RenderNode() {
    return RenderNode
  }

  constructor() {
    super('')
  }

  append(node, parent) {
    this.remove(node)
    if (parent instanceof RenderNode) {
      parent.appendChild(node)
    } else {
      this.appendChild(node)
    }
    return this
  }

  remove(node) {
    const parent = this.getParentNode(node)
    if (parent) {
      parent.removeChild(node)
    } else if (this.hasChild(node)) {
      this.removeChild(node)
    }
    return this
  }

  getParentNode(node) {
    const check = (list, parent) => {
      for (const item of list) {
        if (item === node) return parent
        const child = check(item.children, item)
        if (child) return item
      }
      return null
    }
    return check(this.$tree, this)
  }

  getPrevNode(node) {
    const parent = this.getParentNode(node)
    const list = parent ? parent.children : this.$tree
    const index = list.indexOf(node)
    if (index === -1) return null
    return list[index - 1] || null
  }

  getNextNode(node) {
    const parent = this.getParentNode(node)
    const list = parent ? parent.children : this.$tree
    const index = list.indexOf(node)
    if (index === -1) return null
    return list[index + 1] || null
  }

  getTree() {
    return this.toJSON().children
  }
}

export default RenderTree

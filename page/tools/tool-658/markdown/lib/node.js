class RenderNode {

  constructor(text) {
    this.$text = text
    this.children = []
  }

  hasChild(node) {
    return this.children.indexOf(node) > -1
  }

  appendChild(node) {
    if (node instanceof RenderNode) {
      this.children.push(node)
    }
    return this
  }

  removeChild(node) {
    const index = this.children.indexOf(node)
    this.children.splice(index, 1)
    return this
  }

  toJSON() {
    const obj = {
      type: this.type,
      text: this.$text,
      children: []
    }
    this.children.forEach(item => {
      obj.children.push(item.toJSON())
    })
    return obj
  }
}

export default RenderNode

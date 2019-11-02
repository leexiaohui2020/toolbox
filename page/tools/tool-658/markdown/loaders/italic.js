class RenderItalic {
  constructor() { }
}

export default {
  filter(node) {
    return /\*\S+\*/.test(node.$text)
  },

  exec(node, tree) {
    node.$text = node.$text.replace(/\*\S+\*/g, re => {
      const text = re.match(/\*(\S+)\*/)[1]
      const newNode = new tree.RenderNode(text)
      newNode.type = new RenderItalic()
      tree.append(newNode, node)
      return ''
    })
  }
}
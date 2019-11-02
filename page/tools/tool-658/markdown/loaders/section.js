import createWXML from '../lib/wxml'

class RenderSection {
  constructor(node) {
    this.wxml = createWXML(node, {
      staticClass: ['section']
    })
  }
}

export default {

  filter(node) {
    return !node.type
  },

  exec(node, tree) {
    node.type = new RenderSection(node)
    if (!node.$text.length || /^\s+$/.test(node.$text)) {
      tree.remove(node)
    }
  }
}

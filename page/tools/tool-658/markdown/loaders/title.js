import createWXML from '../lib/wxml'

class RenderTitle {
  constructor(node) {
    this.wxml = createWXML(node, {
      staticClass(node) {
        return ['title', `title_level${node.titleLevel}`]
      }
    })
  }
}

export default {
  filter(node) {
    return /^#+/.test(node.$text)
  },

  exec(node) {
    node.type = new RenderTitle(node)
    node.$text = node.$text.replace(/^#+\s?/, (re) => {
      node.titleLevel = re.trim().length
      return ''
    })
  }
}

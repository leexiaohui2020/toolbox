export default function createWXML(node, opts = {}) {
  return {
    tag: opts.tag || 'view',
    get staticClass() {
      const item = opts.staticClass
      return isFunction(item) ? item(node) : item
    },
    get text() {
      const item = opts.text
      return isFunction(item) ? item(node) : (item || node.$text)
    },
    get children() {
      return node.children.map(item => {
        return item.type.wxml
      })
    }
  }
}

function isFunction(fn) {
  return typeof fn === 'function'
}
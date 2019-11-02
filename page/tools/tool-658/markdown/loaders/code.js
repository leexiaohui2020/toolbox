class RenderCode {
  constructor() {

  }
}

export default {

  filter(node, tree, textList, textIndex) {
    if (/^```/.test(node.$text)) {
      const buffer = []
      for (let i = textIndex + 1; i < textList.length; i++) {
        if (/^```\s?$/.test(textList[i])) {
          buffer.flag = true
          textList.group.add(i)
          break
        }
        buffer.push(i)
      }
      if (buffer.flag) {
        node.$codeText = ''
        buffer.forEach(i => {
          node.$codeText += `\n${textList[i]}`
          textList.group.add(i)
        })
        return true
      }
      return false
    }
    return false
  },

  exec(node) {
    node.type = new RenderCode()
  }
}
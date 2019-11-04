import toolcate from 'toolcate'
const tools = []

function createTool(opts = {}) {
  const config = {}

  Object.assign(config, opts)
  ensurePro(config, 'toolId', 'Number')
  ensurePro(config, 'toolName', 'String')
  ensurePro(config, 'toolCate', 'Array')
  pushToTools(config.toolId, config.toolName, config.toolCate)
  return Page(config)
}

toolcate.forEach(item => {
  Object.defineProperties(item, {
    tools: {
      get() {
        return tools.filter(v => v.cates.includes(item.id))
      }
    }
  })
})

createTool.tools = tools
createTool.cates = toolcate
App.createTool = createTool
Page.createTool = createTool
export default createTool

function getType(n) {
  return Object.prototype.toString.call(n)
    .match(/\[object (\S+)\]/)[1]
}

function ensurePro(obj, pro, type) {
  if (pro in obj) {
    if (type && type !== getType(obj[pro])) {
      throw new Error(`typeof ${pro} was not ${type}`)
    }
  } else {
    throw new Error(`property ${pro} is undefined of Tool`)
  }
}

function pushToTools(id, name, cate) {
  let cates = []
  if (getType(cate) === 'Array') {
    cates = cate
  } else if (getType(cate) === 'String') {
    cates = cate.split(/\s|,/)
  }
  tools.push({ id, name, cates })
}

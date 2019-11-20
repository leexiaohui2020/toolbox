import toolcate from 'toolcate'
import * as logs from 'toollogs'
const tools = []

function createTool(opts = {}) {
  const config = {}
  const { methods = {} } = opts

  delete opts.methods
  Object.assign(config, opts)

  Object.keys(methods).forEach(key => {
    const func = methods[key]
    const funcType = getType(func)
    if (funcType === 'Function') {
      config[key] = function (...args) {
        return func.call(this, ...args)
      }
    } else if (funcType === 'AsyncFunction') {
      config[key] = async function (...args) {
        return await func.call(this, ...args)
      }
    }
  })
  
  ensurePro(config, 'toolId', 'Number')
  ensurePro(config, 'toolName', 'String')
  ensurePro(config, 'toolCate', 'Array')
  pushToTools(config.toolId, config.toolName, config.toolCate)

  config.onShareAppMessage = function() {
    return {
      title: `${this.toolName} - Toolplus`,
      path: `/page/tool/tool-${this.toolId}/main`,
      imageUrl: '/img/share.png'
    }
  }

  config.onLoad = function(...args) {
    logs.add({
      id: this.toolId,
      name: this.toolName,
      cate: this.toolCate
    })
    if (typeof opts.onLoad === 'function') {
      opts.onLoad.call(this, ...args)
    }
  }
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
createTool.search = function(keyword) {
  const re = RegExp(keyword)
  return tools.filter(v => re.test(v.name))
}
createTool.getLogs = function() {
  return logs.getLogs()
}

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

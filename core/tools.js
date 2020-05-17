import Storage from '../utils/part/storage'
import { ensurePro, addUnEnumProp } from '../utils/common'

const tools = []
const store = new Storage('tool/history', {})
export const toolcate = [
  { id: 100, name: '加密解密', icon: 'cate-lock', color: 'blue' },
  { id: 101, name: '文字编辑', icon: 'cate-text', color: 'blue' },
  { id: 102, name: '编程开发', icon: 'cate-console', color: 'orange' },
  { id: 103, name: '单位换算', icon: 'cate-transfer', color: 'red' },
  { id: 104, name: '日期时间', icon: 'cate-calendar', color: 'blue' },
  { id: 105, name: '图形图像', icon: 'cate-picture', color: 'orange' },
  { id: 106, name: '金融理财', icon: 'cate-bank', color: 'red' },
  { id: 107, name: '生活日常', icon: 'cate-qrcode', color: 'green' }
].map(item => addUnEnumProp(item, {
  tools() {
    return tools.filter(v => v.cates.includes(this.id))
  }
}))

function createTool(opts = {}) {
  const config = Object.assign({}, opts)
  const { methods = {} } = config

  ensurePro(config, 'toolId', 'Number')
  ensurePro(config, 'toolCate', 'Array')
  ensurePro(config, 'toolName', 'String')

  Object.keys(methods).forEach(key => {
    const func = methods[key]
    if (typeof func === 'function') {
      config[key] = function(...args) {
        return func.call(this, ...args)
      }
    }
  })

  Object.assign(config, {

    onLoad(opts) {
      if (typeof opts.onLoad === 'function') {
        opts.onLoad.call(this, opts)
      }
      const storeItem = store.findOne({ id: this.toolId })
      if (!storeItem) {
        store.addOne({
          id: this.toolId,
          name: this.toolName,
          cate: this.toolCate
        })
      } else {
        storeItem.update()
      }
    },

    onShareAppMessage() {
      const title = `${this.toolName} - Toolplus`
      const path = `/page/tool/tool-${this.toolId}/main`
      const imageUrl = '/img/share.png'
      return { title, path, imageUrl }
    }
  })

  tools.push({
    id: config.toolId,
    name: config.toolName,
    cates: config.toolCate,
    cover: config.toolCover,
    createdAt: config.toolCreatedAt,
    get isNew() {
      if (!this.createdAt) {
        return false;
      }
      return new Date() - this.createdAt <= 1000 * 60 * 60 * 24 * 30
    }
  })

  delete config.methods
  return Page(config)
}

addUnEnumProp(createTool, {
  tools() {
    return tools
  },

  cates() {
    return toolcate
  },

  search() {
    return function (keyword) {
      const re = RegExp(keyword)
      return tools.filter(v => re.test(v.name))
    }
  },

  getLogs() {
    return function() {
      return store.find().sort((a, b) => b.updateTime - a.updateTime)
    }
  }
})

App.createTool = createTool
Page.createTool = createTool
export default createTool

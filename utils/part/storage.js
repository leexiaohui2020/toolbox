import Crypto from '../libs/crypto'
import { addUnEnumProp } from '../common'

const CACHE_KEY = Symbol('Storage#Cache')
const WATCH_KEY = Symbol('Storage#Watch')
const NACESPACE = Symbol('Storage#Namespace')
const METHOD_KEY = Symbol('Storage#Method')
const ITEM_FACTORY = Symbol('Storage#ItemFactory')

class Storage {

  /**
   * @class
   * @param {String} namespace - 命名空间
   * @param {Object} options
   * @param {Object} options.methods
   * @param {Object} options.statics
   */
  constructor(namespace, options = {}) {
    const { methods = {}, statics = {} } = options
    this[NACESPACE] = Crypto.MD5(namespace).toString()
    this[CACHE_KEY] = wx.getStorageSync(this[NACESPACE]) || []
    this[WATCH_KEY] = new Set()
    this[METHOD_KEY] = methods
    addUnEnumProp(this, {
      length() {
        return this[CACHE_KEY].length
      },
      ...statics
    })
  }

  add(datas = [], before = false) {
    const copyDatas = JSON.parse(JSON.stringify(datas)).map(item => {
      item._createTime = new Date()
      item._updateTime = new Date()
      return item
    })

    this[CACHE_KEY] = before ?
      copyDatas.concat(this[CACHE_KEY]) :
      this[CACHE_KEY].concat(copyDatas)
    this.save()
    return copyDatas.map(v => itemFactory(v, this, this[METHOD_KEY]))
  }

  find(query = {}) {
    return this[CACHE_KEY].filter(v => {
      for (const k in query) {
        if (query[k] !== v[k]) {
          return false
        }
      }
      return true
    }).map(v => itemFactory(v, this, this[METHOD_KEY]))
  }

  update(query = {}, options = {}) {
    this.find(query).forEach(item => {
      item.update(options, false)
    })
    this.save()
    return this
  }

  remove(query = {}) {
    this.find(query).forEach(item => {
      item.remove(false)
    })
    this.save()
    return this
  }

  addOne(data, before = false) {
    return this.add([data], before)[0]
  }

  findOne(query = {}) {
    return this.find(query)[0]
  }

  updateOne(query = {}, options = {}) {
    const item = this.findOne(query)
    item && item.update(options)
    return this
  }

  removeOne(query = {}) {
    const item = this.findOne(query)
    item && item.remove()
    return this
  }

  get(index) {
    const item = this[CACHE_KEY][index]
    return item && itemFactory(item, this, this[METHOD_KEY])
  }

  save(runwatch = true) {
    wx.setStorageSync(this[NACESPACE], this[CACHE_KEY])
    runwatch && this.runwatch()
    return this
  }

  watch(callback, run) {
    this[WATCH_KEY].add(callback)
    if (run) callback(this)
    return this
  }

  unwatch(callback) {
    this[WATCH_KEY].delete(callback)
    return this
  }

  runwatch() {
    this[WATCH_KEY].forEach(callback => callback(this))
    return this
  }
}

export default Storage

/**
 * 强化数据对象操作方法
 * @param {Object} item
 * @param {Storage} store
 * @param {Object} methods
 */
function itemFactory(item, store, methods = {}) {
  const raw = Object.assign({}, item)
  return addUnEnumProp(raw, {

    index() {
      return store[CACHE_KEY].indexOf(item)
    },

    remove() {
      return (save = true) => {
        store[CACHE_KEY].splice(this.index, 1)
        save && store.save()
        return this
      }
    },

    update() {
      return (options = {}, save = true) => {
        options._updateTime = new Date()
        Object.keys(item).forEach(key => {
          if (key in options) {
            item[key] = options[key]
            this[key] = options[key]
          }
        })
        save && store.save()
        return this
      }
    },

    createTime() {
      return item._createTime ? new Date(item._createTime) : null
    },

    updateTime() {
      return item._updateTime ? new Date(item._updateTime) : null
    },

    ...methods
  })
}

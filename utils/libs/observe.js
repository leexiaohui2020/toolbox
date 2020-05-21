const WATCHER = Symbol('Observe.Watcher')

// 解析参数
function parseArgs(args) {
  let name, fn, runWhenBind
  Array.from(args).forEach(item => {
    if (typeof item === 'string' && !name) {
      name = item
    } else if (typeof item === 'function' && !fn) {
      fn = item
    } else if (typeof item === 'boolean' && typeof runWhenBind !== 'boolean') {
      // 是否立即执行一次
      runWhenBind = item
    }
  })
  return { name, fn, runWhenBind }
}

class Observe {

  constructor() {
    this[WATCHER] = []
  }

  // 添加监听函数
  watch() {
    const { name, fn, runWhenBind } = parseArgs(arguments)
    console.info(arguments, { name, fn, runWhenBind })
    if (!fn) throw new Error('fn must be a function')
    this[WATCHER].push({ name, fn })
    if (runWhenBind) fn(this)
    return this
  }

  // 取消监听
  unWatch() {
    const { name, fn } = parseArgs(arguments)
    this[WATCHER].filter(item => {
      if (name && item.name !== name) return false
      return fn === item.fn 
    }).forEach(item => {
      const index = this[WATCHER].findIndex(item)
      this[WATCHER].splice(index, 1)
    })
    return this
  }

  // 执行监听函数
  runWatch(name) {
    this[WATCHER].filter(item => {
      if (name && item.name !== name) return false
      return true
    }).forEach(item => {
      item.fn(this)
    })
  }
}

export default Observe

/**
 * 增加不可枚举属性
 * @param {Object} obj
 * @param {Object} options
 */
export function addUnEnumProp(obj, options) {
  Object.keys(options).forEach(key => {
    Object.defineProperty(obj, key, {
      enumerable: false,
      get() {
        return options[key].call(obj)
      }
    })
  })
  return obj
}

export function getType(n) {
  return Object.prototype.toString.call(n).match(/\[object (\S+)\]/)[1]
}

export function ensurePro(obj, pro, type) {
  if (pro in obj) {
    if (type && type !== getType(obj[pro])) {
      throw new Error(`typeof ${pro} was not ${type}`)
    }
  } else {
    throw new Error(`property ${pro} is undefined of Tool`)
  }
}

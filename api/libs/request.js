import Cookie from 'cookie'
import Crypto from '../../utils/libs/crypto'

function request(opts = {}) {

  return new Promise((resolve, reject) => {

    opts.header = Object.assign({
      Cookie: Cookie.get()
    }, opts.header)

    wx.request(Object.assign({

      success(res) {
        if (res.cookies) {
          Cookie.set(res.cookies)
        }
        resolve(res)
      },
      fail(e) {
        reject(e)
      }
    }, opts))
  })
}

const requestCache = Symbol('Request#Cache')
const getKey = (url, data = {}, header = {}) => {
  const objStr = JSON.stringify({ url, data, header })
  return Crypto.MD5(objStr).toString()
}

export default {

  [requestCache]: {
    get: {},
    post: {}
  },

  get(url, data = {}, header = {}, useCache = true) {
    const key = getKey(url, data, header)
    const getCache = this[requestCache].get
    if (getCache[key] && useCache) {
      return Promise.resolve(getCache[key])
    }

    return request({ url, data, header }).then(res => {
      // 对GET请求进行缓存
      useCache && (getCache[key] = res)
      return res
    })
  },

  post(url, data = {}, header = {}, useCache = true) {
    const key = getKey(url, data, header)
    const postCache = this[requestCache].post
    if (postCache[key] && useCache) {
      return Promise.resolve(postCache[key])
    }

    return request({ url, data, header, method: 'POST' }).then(res => {
      useCache && (postCache[key] = res)
      return res
    })
  }
}

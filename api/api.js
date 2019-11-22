import config from 'api.config'
import Cookie from 'cookie'

export default new Proxy({}, {
  get(target, key) {
    if (!target[key]) {
      target[key] = require(`./modules/${key}`).default(request, config)
    }
    return target[key]
  }
})

function request(opts = {}) {
  return new Promise((resolve, fail) => {
    const header = Object.assign({}, opts.headers, {
      Cookie: Cookie.get()
    })
    opts.header = header
    wx.request(Object.assign(opts, {
      success(res) {
        if (res.cookies) {
          Cookie.set(res.cookies)
        }
        resolve(res)
      }, fail
    }))
  })
}

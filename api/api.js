import config from 'api.config'

export default new Proxy({}, {
  get(target, key) {
    if (!target[key]) {
      target[key] = require(`./modules/${key}`).default(request, config)
    }
    return target[key]
  }
})

function request(opts = {}) {
  return new Promise((success, fail) => {
    wx.request(Object.assign(opts, { success, fail }))
  })
}

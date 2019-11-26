import * as config from 'api.config'
import request from 'libs/request'

export default new Proxy({}, {
  get(target, key) {

    if (!target[key]) {
      const modules = {}
      const parts = require(`./modules/${key}`)
      const getURL = url => `${config.hostname}${url}`
      Object.keys(parts).forEach(key => {
        if (typeof parts[key] !== 'function') return
        modules[key] = parts[key].bind({ getURL, request, config })
      })
      target[key] = modules
    }

    return target[key]
  }
})

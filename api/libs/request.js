import Cookie from 'cookie'

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

export default {
  get(url, data = {}, header = {}) {
    return request({ url, data, header })
  },

  post(url, data = {}, header = {}) {
    return request({ url, data, header, method: 'POST' })
  }
}

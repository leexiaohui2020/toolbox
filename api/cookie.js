import Storage from '../utils/storage'
const Cookie = new Storage('cookie', {

  statics: {

    set() {
      return (cookies = []) => {
        cookies.forEach(cookie => {
          cookie.split(/;\s*/).forEach(item => {
            const list = item.split('=')
            const key = list[0]
            const value = list.slice(1).join('')
            const ck = Cookie.findOne({ key })
            if (ck) {
              ck.update({ value })
            } else {
              Cookie.addOne({ key, value })
            }
          })
        })
      }
    },

    get() {
      return key => {
        if (key) {
          const item = Cookie.findOne({ key })
          return item && item.value
        }
        return Cookie.find().map(({ key, value }) => `${key}=${value}`).join('; ')
      }
    }
  }
})

export default Cookie
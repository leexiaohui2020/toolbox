import Storage from '../../utils/part/storage'

function setCookie(cookies = []) {
  cookies.forEach(item => {
    item.split(/;\s*/).forEach(cookie => {
      const arr = cookie.split('=')
      const key = arr[0]
      const value = arr.slice(1).join('=')
      const doc = this.findOne({ key })
      doc ? doc.update({ value }) : this.addOne({ key, value })
    })
  })
}

function getCookie(key) {
  if (key) {
    const cookie = this.findOne({ key })
    return cookie && cookie.value
  }

  return this.find().map(({ key, value }) => {
    return `${key}=${value}`
  }).join('; ')
}

export default new Storage('cookie', {
  statics: {
    set() {
      return setCookie.bind(this)
    },

    get() {
      return getCookie.bind(this)
    }
  }
})

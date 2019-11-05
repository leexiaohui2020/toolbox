const storageKey = App.$utils.CryptoJS.MD5('search/keyword').toString()
export let history = wx.getStorageSync(storageKey) || []

export function add(keyword) {
  if (history.includes(keyword)) return
  if (!keyword || typeof keyword !== 'string') return
  history.push(keyword)
  save()
}

export function save() {
  wx.setStorage({ key: storageKey, data: history })
}

export function clear() {
  history = []
  wx.removeStorageSync(storageKey)
}

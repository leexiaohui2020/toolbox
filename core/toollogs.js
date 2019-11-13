import CryptoJS from '../utils/crypto'
const key = CryptoJS.MD5('tool/history').toString()
let logs = wx.getStorageSync(key) || []

export function getLogs() {
  return logs.sort((a, b) => b.time - a.time)
}

export function add(item) {
  let logItem = logs.find(v => v.id === item.id)
  if (!logItem) {
    logItem = Object.assign(item)
    logs.push(logItem)
  }
  logItem.time = Date.now()
  save()
}

export function save() {
  wx.setStorageSync(key, logs)
}

export function clear() {
  logs = []
  wx.removeStorageSync(key)
}
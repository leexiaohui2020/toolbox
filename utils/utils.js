import crypto from 'crypto'
export const CryptoJS = crypto
export function copyText(data) {
  wx.setClipboardData({
    data,
    success() {
      wx.showToast({ title: '复制成功', icon: 'success' })
    },
    fail() {
      wx.showToast({ title: '复制失败', icon: 'none' })
    }
  })
}

/** @param {Date} date */
export function toLocaleDateString(date) {
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  return [Y,M,D].join('-')
}

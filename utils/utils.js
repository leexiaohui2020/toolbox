import crypto from 'crypto'
import qrcode from 'qrcode'
export const CryptoJS = crypto
export const Qrcode = qrcode

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

export function canvasToTempFilePathDelay(...args) {
  setTimeout(() => {
    wx.canvasToTempFilePath(...args)
  }, 200)
}

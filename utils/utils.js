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

/** 选择图片并进行安全检测 */
export function chooseImageSecu(opts = {}) {
  return new Promise((resolve, reject) => {
    wx.chooseImage(Object.assign({}, opts, {
      fail: reject,
      success(res) {
        const fs = wx.getFileSystemManager()
        const list = res.tempFilePaths.slice(0)
        const checkNext = (cb) => {
          if (list.length === 0) return cb()
          fs.readFile({
            encoding: 'base64',
            filePath: list.shift(),
            success: res => {
              App.$api.security.image(`data:image/jpeg;base64,${res.data}`).then(({ data }) => {
                if (data.status !== 'ok') {
                  wx.hideLoading()
                  wx.showToast({ title: data.errmsg })
                  return reject(new Error(data.errmsg))
                }
                checkNext(cb)
              }).catch(reject)
            },
            fail: reject
          })
        }

        wx.showLoading({ title: '安全检测中' })
        checkNext(() => {
          wx.hideLoading()
          resolve(res)
        })
      }
    }))
  })
}

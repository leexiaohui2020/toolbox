import _Crypto from 'libs/crypto'
import _Qrcode from 'libs/qrcode'
import Storage from 'part/storage'
import Audio from 'part/audio'
import * as _sort from 'part/sort'

export const CryptoJS = _Crypto
export const Qrcode = _Qrcode
export const sort = _sort

export function createStorage(namespace, options) {
  return new Storage(namespace, options)
}

export function createAudio(...args) {
  return new Audio(...args)
}

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
export function toLocaleDateString(date = new Date()) {
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  return [Y,M,D].map(v => v < 10 ? `0${v}` : v).join('-')
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
          tempFilePathToBase64(list.shift()).then(img => {
            App.$api.security.image(`data:image/jpeg;base64,${res.data}`).then(({ data }) => {
              if (data.status !== 'ok') {
                wx.hideLoading()
                wx.showToast({ title: data.errmsg })
                return reject(new Error(data.errmsg))
              }
              checkNext(cb)
            }).catch(reject)
          }).catch(reject)
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

export function tempFilePathToBase64(filePath) {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath,
      encoding: 'base64',
      fail: reject,
      success: res => {
        resolve(`data:image/jpeg;base64,${res.data}`)
      }
    })
  })
}

/** 检测对一段文本是否含有敏感内容 */
export function msgSecCheck(content, callback) {
  wx.showLoading({ title: '文本安全检测' })
  return App.$api.security.msg(content).then(({ data }) => {
    if (data.status !== 'ok') {
      throw new Error(data.errmsg)
    }
    return callback()
  }).catch(() => {
    wx.showModal({
      title: '提示',
      content: '您输入的文本含有敏感词汇'
    })
  }).finally(() => {
    wx.hideLoading()
  })
}

/**
 * 保存图片到相册
 * @param {String} filePath - 临时文件路径或永久文件路径 
 */
export function savePhoto(filePath) {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      filePath,
      success(res) {
        resolve(res)
      },
      fail(e) {
        wx.showModal({
          title: '提示',
          content: '图片保存失败'
        })
        reject(e)
      }
    })
  })
}

/**
 * 保存网络图片
 */
export function saveNetPhoto(src) {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src,
      success(res) {
        savePhoto(res.path).then(resolve).catch(reject)
      },
      fail(e) {
        reject(e)
      }
    })
  })
}

/** 计算两点间距离 */
export function computeDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

/** 保存base64格式图片 */
export function base64ToTempFilePath(data, etx) {
  return new Promise((resolve, reject) => {
    const fs = wx.getFileSystemManager()
    const filePath = `${wx.env.USER_DATA_PATH}/base64ToTempFilePath.${etx}`
    fs.writeFile({
      data,
      filePath,
      encoding: 'base64',
      success() {
        resolve(filePath)
      },
      fail: reject
    })
  })
}

export function computedData(obj, opts) {
  const options = {}, state = obj.$state = {}
  Object.keys(opts).forEach(key => {
    options[key] = {
      get() {
        return new Promise((resolve, reject) => {
          opts[key].call(obj, state, resolve, reject)
        })
      }
    }
  })
  Object.defineProperties(obj, options)
}
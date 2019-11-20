import { addUnEnumProp } from './storage'
const MANAGER_KEY = Symbol('Audio#Manager')

class Audio {

  constructor(initOptions = {}, statics = {}) {
    this[MANAGER_KEY] = wx.getBackgroundAudioManager()
    Object.assign(this[MANAGER_KEY], initOptions)
    addUnEnumProp(this, statics)
  }

  bind(instance) {
    const manager = this[MANAGER_KEY]
    const methodKeys = ['play', 'pause', 'seek', 'stop']
    const lifetimes = {}
    const lifetimeKeys = [
      'onPlay',
      'onStop',
      'onNext',
      'onPrev',
      'onEnded',
      'onError',
      'onCanplay',
      'onWaiting',
      'onPause',
      'onSeeked',
      'onSeeking',
      'onTimeUpdate'
    ]

    methodKeys.forEach(key => {
      instance[key] = (...args) => manager[key](...args)
    })

    lifetimeKeys.forEach(key => {
      lifetimes[key] = function(...args) {
        if (typeof instance[key] === 'function') {
          instance[key](...args)
        }
      }
      manager[key](lifetimes[key])
    })

    instance.$audio = this
    return instance
  }

  get manager() {
    return this[MANAGER_KEY]
  }
}

export default Audio

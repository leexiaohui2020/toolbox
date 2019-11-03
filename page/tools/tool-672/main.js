const zeroTo59 = Array(60).fill(0).map((v, i) => v + i)
const STATUS = {
  READY: 'ready',
  START: 'start',
  PAUSE: 'pause'
}

Page({

  data: {
    
    pickerValue: [0, 0],
    pickerRange: [zeroTo59.slice(0), zeroTo59.slice(0)],
    status: STATUS.READY,
    countdown: 0
  },

  onUnload() {
    clearTimeout(this.tm)
  },

  pickerHandler(e) {
    const { value } = e.detail
    this.setData({ pickerValue: value })
  },

  start() {
    const { pickerValue, pickerRange } = this.data
    const min = pickerRange[0][pickerValue[0]]
    const sec = pickerRange[1][pickerValue[1]]
    const countdown = min * 60 + sec
    if (countdown <= 0) return
    this.setData({
      countdown,
      status: STATUS.START
    })
    this.go()
  },

  reset() {
    this.setData({
      countdown: 0,
      status: STATUS.READY
    })
  },

  pause() {
    this.setData({ status: STATUS.PAUSE })
  },
  resume() {
    if (this.data.countdown > 0) {
      this.setData({ status: STATUS.START })
      this.go()
    }
  },

  go() {
    if (this.data.status !== STATUS.START) return
    const { countdown } = this.data
    if (countdown <= 0) return this.reset()

    const tm = this.tm = setTimeout(() => {
      clearTimeout(tm)
      this.setData({ countdown: countdown - 1 })
      this.go()
    }, 1000)
  }
})

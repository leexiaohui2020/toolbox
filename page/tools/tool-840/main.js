const CNNumber = '零一二三四五六七八九十'
const formater = (num) => num.replace('一十', '十').replace('十零', '十')
const hourMap = Array(24).fill(0).map((v, k) => {
  return formater(String(k).split('').map(v => CNNumber[v]).join('十') + '时')
})
const minMap = Array(60).fill(0).map((v, k) => {
  return formater(String(k).split('').map(v => CNNumber[v]).join('十') + '分')
})
const secMap = Array(60).fill(0).map((v, k) => {
  return formater(String(k).split('').map(v => CNNumber[v]).join('十') + '秒')
})
const dateStrFormater = str => str.split('-').map((v, k) => {
  if (k === 0) return v.split('').map(v => CNNumber[v]).join('') + '年'
  if (k === 1) return formater(v.split('').map(v => CNNumber[v]).join('十')) + '月'
  if (k === 2) return formater(v.split('').map(v => CNNumber[v]).join('十')) + '日'
}).join('')

Page.createTool({
  toolId: 840,
  toolName: '罗盘时钟',
  toolCate: [104],
  toolCreatedAt: new Date('2019/11/10'),

  data: {
    secMap,
    minMap,
    hourMap,

    sec: 0,
    min: 0,
    hour: 0,
    dateStr: ''
  },

  onLoad() {
    this.getNowTime()
    this.loop()
  },

  onUnload() {
    clearInterval(this.tm)
  },

  getNowTime() {
    const now = new Date()
    const timeStr = now.toTimeString().split(' ')[0]
    const dateStr = App.$utils.toLocaleDateString(now)
    const temp = timeStr.split(':').map(v => Number(v))
    this.setData({
      hour: temp[0] * 15 || 360,
      min: temp[1] * 6 || 360,
      sec: temp[2] * 6 || 360,
      dateStr: dateStrFormater(dateStr)
    }, () => {
      const obj = {}
      const tm = setTimeout(() => {
        if (this.data.hour === 360) obj.hour = 0
        if (this.data.min === 360) obj.min = 0
        if (this.data.sec === 360) obj.sec = 0
        this.setData(obj)
        clearTimeout(tm)
      }, 500)
    })
  },

  loop() {
    this.tm = setInterval(() => {
      this.getNowTime()
    }, 1000)
  }
})

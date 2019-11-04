import { toLocaleDateString } from '../../../utils/utils.js'

Page.createTool({

  toolId: 675,
  toolName: '预产期计算器',
  toolCate: [104],

  data: {
    tips: '',
    datetext: '',
    zhouqiIndex: 0,
    zhouqiList: Array(26).fill(20).map((v, k) => `${v + k}天`),
    datepickerend: toLocaleDateString(new Date()),
    result: null
  },

  setTips(tips) {
    this.setData({ tips })
  },

  inputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    this.setData({ [key]: value })
  },

  buttonHandler() {
    this.setData({ result: null }, () => {
      const { zhouqiList, zhouqiIndex, datetext } = this.data
      if (!datetext) return this.setTips('请选择您的末次月经日期')
      const tail = new Date(datetext).getTime()
      const avZhouqi = parseInt(zhouqiList[zhouqiIndex])
      const ycq = new Date(tail + (avZhouqi + 252) * 86400000)
      const now = Date.now()
      const cha = Math.floor((now - tail) / 86400000)
      console.info(tail, avZhouqi, ycq, now, cha)
      if (cha < 0) return this.setTips('您的末次月经日期超过当前时间了！')

      const yunzhou = Math.floor(cha / 7)
      const yuntian = parseInt(cha % 7) + 1
      const remainDay = Math.floor((ycq.getTime() - now) / 86400000) + 1
      if (remainDay < 0) return this.setTips('您的预产期已经超过了')
      this.setData({
        tips: '',
        result: {
          year: ycq.getFullYear(),
          month: ycq.getMonth() + 1,
          date: ycq.getDate(),
          zhou: yunzhou,
          tian: yuntian,
          remainDay
        }
      })
    })
  }
})

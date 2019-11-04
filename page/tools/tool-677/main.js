import calendar from './calendar.js'

const now = new Date()
const nowYear = now.getFullYear()
const nowMonth = now.getMonth()
const nowDate = now.getDate()

const createDayList = (Y, M) => {
  const dayLen = calendar.solarDays(Y, M)
  const list = []
  for (let i = 0; i < dayLen; i++) {
    const info = calendar.solar2lunar(Y, M, i + 1)
    info.pickerText = `${info.cDay} (${info.IDayCn})`
    list.push(info)
  }
  return list
}

Page.createTool({

  toolId: 677,
  toolName: '万年历',
  toolCate: [104],

  data: {
    pickYM: `${nowYear}-${nowMonth + 1}`,
    dayList: createDayList(nowYear, nowMonth + 1),
    pickIndex: nowDate - 1
  },

  inputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    this.setData({ [key]: value })
    this.compute()
  },

  actionHandler(e) {
    const { type } = e.currentTarget.dataset
    const date = new Date(`${this.data.pickYM}-${this.data.pickIndex + 1}`)
    date.setDate(date.getDate() + (type === 'left' ? -1 : 1))
    const [Y, M, D] = App.$utils.toLocaleDateString(date).split('-')
    const pickYM = `${Y}-${M}`
    const pickIndex = D - 1
    if (pickYM !== this.data.pickYM) {
      this.setData({ pickYM, pickIndex })
      this.compute()
    } else {
      this.setData({ pickYM, pickIndex })
    }
  },

  compute() {
    const [Y, M] = this.data.pickYM.split('-')
    console.info(Y, M)
    const dayList = createDayList(Y, M)
    let pickIndex = this.data.pickIndex
    if (pickIndex >= dayList.length) {
      pickIndex = dayList.length - 1
    }
    this.setData({ dayList, pickIndex })
  }
})

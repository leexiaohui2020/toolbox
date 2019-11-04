import * as wordcard from 'wordcard'
import reList from 'regexp'

Page.createTool({

  toolId: 678,
  toolName: '正则表达式测试',
  toolCate: [102],

  data: {
    tips: '',
    text: '',
    regexp: '',
    sGlobal: true,
    sIgnore: false,
    result: '',
    wordcard,
    reList,
  },

  setTips(tips) {
    this.setData({ tips })
  },

  inputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    this.setData({ [key]: value })
  },

  checkboxHandler(e) {
    const { value } = e.detail
    this.setData(value.reduce((map, item) => {
      map[item] = true
      return map
    }, { sGlobal: false, sIgnore: false }))
  },

  pickerHandler(e) {
    const { value } = e.detail
    const regexp = reList[value].regexp
    this.setData({ regexp })
  },

  buttonHandler() {
    const { text, regexp, sGlobal, sIgnore } = this.data
    const extra = []

    if (!text) return this.setTips('请输入待匹配文本')
    if (!regexp) return this.setTips('请输入正则表达式')
    if (sGlobal) extra.push('g')
    if (sIgnore) extra.push('i')

    const re = RegExp(regexp, extra.join(''))
    const dataObj = { result: null }

    if (!re.test(text)) {
      dataObj.result = '（没有匹配）'
    } else if (sGlobal) {
      const len = text.match(re).length
      const html = text.replace(re, s => `<span class="text-red">${s}</span>`)
      dataObj.result = `<div>共找到 ${len} 处匹配：</div><div>${ html }</div>`
    } else {
      const match = text.match(re)
      dataObj.result = `<div>匹配位置：${match.index}</div><div>匹配结果：${match[0]}</div>`
    }

    dataObj.tips = ''
    this.setData(dataObj)
  }
})

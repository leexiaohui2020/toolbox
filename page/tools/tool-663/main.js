Page({

  toolId: 663,
  toolName: '随机密码生成',

  data: {
    lenList: [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    lenIndex: 0,
    lower: true,
    upper: true,
    number: true,
    punctuation: true,
    result: ''
  },

  inputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    this.setData({ [key]: value })
  },

  checkboxHandler(e) {
    const dataObj = {
      lower: false,
      upper: false,
      number: false,
      punctuation: false
    }
    for (const k in dataObj) {
      if (e.detail.value.includes(k)) {
        dataObj[k] = true
      }
    }
    this.setData(dataObj)
  },

  copy() {
    App.$utils.copyText(this.data.result)
  },

  buttonHandler() {
    const result = this.generatePassword()
    this.setData({ result })
  },

  generatePassword() {
    const length = this.data.lenList[this.data.lenIndex]
    const string = 'abcdefghijklmnopqrstuvwxyz'
    const strUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberic = '0123456789'
    const strPunc = '!@#$%^&*()_+~`|}{[]\:;?><,./-='
    const getRandom = str => str.charAt(Math.ceil(str.length * Math.random() * Math.random()) - 1)
    const { lower, upper, number, punctuation } = this.data
    let password = ''
    while(password.length < length) {
      if (lower) password += getRandom(string)
      if (upper) password += getRandom(strUpper)
      if (number) password += getRandom(numberic)
      if (punctuation) password += getRandom(strPunc)
      if (!password.length) break
    }
    return password
  }
})
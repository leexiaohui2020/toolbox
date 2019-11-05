Page.createTool({

  toolId: 680,
  toolName: '散列/哈希',
  toolCate: [100],

  data: {
    text: '',
    pickList: [
      { name: 'SHA1', type: 1 },
      { name: 'SHA224', type: 1 },
      { name: 'SHA256', type: 1 },
      { name: 'SHA384', type: 1 },
      { name: 'SHA512', type: 1 },
      { name: 'MD5', type: 1 },
      { name: 'HmacSHA1', type: 2 },
      { name: 'HmacSHA224', type: 2 },
      { name: 'HmacSHA256', type: 2 },
      { name: 'HmacSHA384', type: 2 },
      { name: 'HamcSHA512', type: 2 },
      { name: 'HamcMD5', type: 2 },
      { name: 'PBKDF2', type: 3 }
    ],
    pickIndex: 0,
    pass: '',
    keySizeList: [
      { name: '128位', value: 4 },
      { name: '256位', value: 8 },
      { name: '512位', value: 16 }
    ],
    keySizeIndex: 0,
    salt: '',
    iterations: '',
    result: '',
    tips: ''
  },

  methods: {

    setTips(tips) {
      this.setData({ tips })
    },

    inputHandler(e) {
      const { key } = e.currentTarget.dataset
      const { value } = e.detail
      this.setData({ [key]: value })
    },

    buttonHandler() {
      const {
        text,
        pass,
        salt,
        pickList,
        pickIndex,
        keySizeList,
        keySizeIndex
      } = this.data
      const pick = pickList[pickIndex]
      const CryptoJS = App.$utils.CryptoJS

      let result
      if (pick.type === 1) {
        result = CryptoJS[pick.name](text).toString()
      } else if (pick.type === 2) {
        result = CryptoJS[pick.name](text, pass).toString()
      } else if (pick.type === 3) {
        const keySize = keySizeList[keySizeIndex].value
        const iterations = Math.max(1, parseInt(this.data.iterations))
        if (isNaN(iterations)) return this.setTips('迭代次数必须为数字')
        result = CryptoJS[pick.name](text, salt, { keySize, iterations }).toString()
      }

      this.setData({ tips: '', result })
    }
  }
})

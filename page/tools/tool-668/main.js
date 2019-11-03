Page({

  toolId: 668,
  toolName: '颜色值RGB/HEX转换',

  data: {
    red: 117,
    blue: 96,
    green: 216,
    hex: '#b1d85c'
  },

  rgbInputHandler(e) {
    const { value } = e.detail
    const { key } = e.currentTarget.dataset
    if (/^(0|[1-9]\d*)(\.\d+)?$/.test(value) === false) {
      return this.data[key]
    }

    const dataObj = {
      red: this.data.red,
      blue: this.data.blue,
      green: this.data.green,
      hex: this.data.hex
    }
    dataObj[key] = Math.min(255, +value)
    if (dataObj.red && dataObj.blue && dataObj.green) {
      dataObj.hex = this.rgbToHex(dataObj.red, dataObj.green, dataObj.blue)
    }
    this.setData(dataObj)
  },

  hexInputHandler(e) {
    const { value } = e.detail
    if (/^#[0-9a-f]{1,6}$/.test(value) === false) {
      return this.data.hex
    }
    if (value.length === 7) {
      const rgb = this.hexToRGB(value)
      this.setData({
        hex: value,
        red: rgb.r,
        blue: rgb.b,
        green: rgb.g
      })
    }
  },

  rgbToHex(r, g, b) {
    const fill = v => v.length > 1 ? v : `0${v}`
    const gv = v => fill((+v).toString(16))
    return `#${gv(r)}${gv(g)}${gv(b)}`
  },

  hexToRGB(hex) {
    const r = +`0x${hex.substring(1, 3)}`
    const g = +`0x${hex.substring(3, 5)}`
    const b = +`0x${hex.substring(5)}`
    return { r, g, b }
  },

  copyRGB() {
    const { red, blue, green } = this.data
    const data = `rgb(${red}, ${green}, ${blue})`
    App.$utils.copyText(data)
  },

  copyHEX() {
    App.$utils.copyText(this.data.hex)
  }
})

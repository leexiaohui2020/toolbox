function isDot(num) {
  return num === '.'
}

class ExpressionNumber {

  constructor(num, percent = false, inverse = false) {
    this.type = 'number'
    this.pre = isDot(num) ? 0 : num
    if (isDot(num)) this.suf = ''
    this.inverse = inverse
    this.percent = percent
  }

  hasSuf() {
    return typeof this.suf === 'string'
  }

  unshift() {
    if (this.hasSuf()) {
      this.suf = this.suf.substr(0, this.suf.length - 1)
      if (this.suf.length === 0) {
        delete this.suf
      }
    } else {
      this.pre = Math.floor(this.pre / 10)
      if (this.pre === 0) {
        this.inverse = false
        return true
      }
    }
  }

  append(num) {
    if (isDot(num)) {
      if (!this.hasSuf()) {
        this.suf = ''
      }
    } else {
      if (this.hasSuf()) {
        this.suf += num
      } else {
        this.pre = this.pre * 10 + num
      }
    }
    return this
  }

  togglePercent() {
    this.percent = !this.percent
  }

  toggleInverse() {
    this.inverse = !this.inverse
  }

  toNumber() {
    let val = +`${this.pre}.${this.suf || 0}`
    if (this.percent) val = val / 100
    if (this.inverse) val = -val
    return isNaN(val) ? 0 : val
  }

  toString() {
    let str = `${this.pre}`
    if (this.inverse) str = '-' + str
    if (this.hasSuf()) str += `.${this.suf}`
    if (this.percent) str += '％'
    return str
  }

  setValue(number) {
    const [pre, suf] = `${number}`.split('.')
    this.pre = Math.abs(+pre)
    this.inverse = +pre < 0
    if (suf && suf.length) {
      this.suf = suf
    } else {
      delete this.suf
    }
    this.percent = false
    return this
  }
}

export default ExpressionNumber

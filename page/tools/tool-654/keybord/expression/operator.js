const operatorMap = {
  '+': {
    order: 0,
    value: '＋',
    exec(a, b) {
      return a.toNumber() + b.toNumber()
    }
  },

  '-': {
    order: 0,
    value: '－',
    exec(a, b) {
      return a.toNumber() - b.toNumber()
    }
  },

  '*': {
    order: 1,
    value: '×',
    exec(a, b) {
      return a.toNumber() * b.toNumber()
    }
  },

  '/': {
    order: 1,
    value: '÷',
    exec(a, b) {
      return (a.toNumber() / b.toNumber()).toFixed(9)
    }
  }
}

class ExpressOperator {
  constructor(text) {
    this.text = text
    this.type = 'operator'
  }

  get value() {
    return operatorMap[this.text].value
  }

  get order() {
    return operatorMap[this.text].order
  }

  get exec() {
    return operatorMap[this.text].exec
  }

  toString() {
    return this.value
  }
}

export default ExpressOperator

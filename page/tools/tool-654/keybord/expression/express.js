import ExpressionNumber from './number'
import ExpressionOperator from './operator'

class Expression {

  static TYPE = {
    NUMBER: 'number',
    OPERATOR: 'operator'
  }

  static Number = ExpressionNumber
  static Operator = ExpressionOperator

  constructor() {
    this.TYPE = Expression.TYPE
    this.express = []
    this.Number = ExpressionNumber
    this.Operator = ExpressionOperator
  }

  clear() {
    this.express = []
    return this
  }

  push(item) {
    this.express.push(item)
    return this
  }

  pushNumber(num) {
    if (this.lastChild instanceof ExpressionNumber) {
      this.lastChild.append(num)
    } else {
      this.express.push(new ExpressionNumber(num))
    }
    return this
  }

  pushOperator(text) {
    if (this.lastChild instanceof ExpressionOperator) {
      return this
    }
    this.express.push(new ExpressionOperator(text))
    return this
  }

  remove(item) {
    const index = this.express.indexOf(item)
    this.express.splice(index, 1)
    return this
  }

  toString() {
    return this.express.map(item => {
      return item.toString()
    }).join('')
  }

  toResult() {
    if (this.length < 3) return ''
    const express = this.express.slice(0)
    if (express[express.length - 1] instanceof ExpressionOperator) {
      express.splice(express.length - 1, 1)
    }

    while (express.some(v => v instanceof ExpressionOperator)) {
      const item = express.filter(v => v instanceof ExpressionOperator).sort((a, b) => b.order - a.order)[0]
      const index = express.indexOf(item)
      const val = item.exec(express[index - 1], express[index + 1])
      express[index] = new ExpressionNumber(0).setValue(val)
      express.splice(index - 1, 1)
      express.splice(index, 1)
    }
    return express[0].toString()
  }

  get length() {
    return this.express.length
  }

  get lastChild() {
    return this.express[this.length - 1]
  }

  get firstChild() {
    return this.express[0]
  }
}

export default new Expression()

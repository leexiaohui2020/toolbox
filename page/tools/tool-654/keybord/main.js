import keyboard from './keybord/keybord.js'
import expression from './expression/express.js'

keyboard.push({
  type: 1,
  text: 'AC',
  exec: () => expression.clear()
}, 0)
keyboard.push({
  type: 1,
  text: '+/-',
  exec() {
    const lastChild = expression.lastChild
    if (!lastChild) return expression
    if (lastChild instanceof expression.Operator) {
      if (lastChild.text === '+') {
        lastChild.text = '-'
        return expression
      }
      if (lastChild.text === '-') {
        lastChild.text = '+'
        return expression
      }
    }
    expression.firstChild.toggleInverse()
    return expression
  }
}, 0)
keyboard.push({
  type: 1,
  text: '％',
  exec() {
    const lastChild = expression.lastChild
    if (!lastChild) return expression
    if (lastChild instanceof expression.Number) {
      lastChild.togglePercent()
      return expression
    }
    return expression.push(new expression.Number(0, true))
  }
}, 0)
keyboard.push({
  type: 1,
  text: '÷',
  exec: () => expression.pushOperator('/')
}, 0)

keyboard.push({
  text: '7',
  exec: () => expression.pushNumber(7)
}, 1)
keyboard.push({
  text: '8',
  exec: () => expression.pushNumber(8)
}, 1)
keyboard.push({
  text: '9',
  exec: () => expression.pushNumber(9)
}, 1)
keyboard.push({
  type: 1,
  text: '×',
  exec: () => expression.pushOperator('*')
}, 1)

keyboard.push({
  text: '4',
  exec: () => expression.pushNumber(4)
}, 2)
keyboard.push({
  text: '5',
  exec: () => expression.pushNumber(5)
}, 2)
keyboard.push({
  text: '6',
  exec: () => expression.pushNumber(6)
}, 2)
keyboard.push({
  type: 1,
  text: '－',
  exec: () => expression.pushOperator('-')
}, 2)

keyboard.push({
  text: '1',
  exec: () => expression.pushNumber(1)
}, 3)
keyboard.push({
  text: '2',
  exec: () => expression.pushNumber(2)
}, 3)
keyboard.push({
  text: '3',
  exec: () => expression.pushNumber(3)
}, 3)
keyboard.push({
  type: 1,
  text: '＋',
  exec: () => expression.pushOperator('+')
}, 3)

keyboard.push({
  text: '0',
  exec: () => expression.pushNumber(0)
}, 4)
keyboard.push({
  text: '.',
  exec: () => expression.pushNumber('.')
}, 4)
keyboard.push({
  text: 'DEL',
  exec() {
    const lastIndex = expression.length - 1
    const lastChild = expression.lastChild
    if (!lastChild) return expression
    if (lastChild instanceof expression.Number) {
      if (lastChild.unshift()) {
        expression.remove(lastChild)
      }
      return expression
    }
    expression.remove(lastChild)
    return expression
  }
}, 4)
keyboard.push({
  type: 2,
  text: '=',
  exec() {
    const res = expression.toResult()
    expression.clear()
    expression.push(new expression.Number(0).setValue(res))
    return expression
  }
}, 4)

export default keyboard

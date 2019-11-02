class KeyBoard {
  constructor() {
    this.list1 = [[],[],[],[],[]]
    this.list2 = []
  }

  push(item, index) {
    this.list1[index].push(item)
    this.list2.push(item)
    item.id = this.list2.length
  }

  find(id) {
    return this.list2.find(v => v.id === id)
  }

  get list() {
    return this.list1
  }
}

export default new KeyBoard()

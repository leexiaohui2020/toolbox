Component({
  
  options: {
    addGlobalClass: true
  },
  properties: {
    data: {
      type: Array,
      value: []
    }
  },

  methods: {
    inputHandler(e) {
      const { key } = e.currentTarget.dataset
      const { value } = e.detail
      const { data } = this.data
      console.info(key, value)
      if (parseFloat(value) != value && value !== '') {
        return data[key].value
      }
      this.setData({ [`data[${key}].value`]: value })
    },

    actionHandler(e) {
      const { key } = e.currentTarget.dataset
      const dataObj = {}
      const { data } = this.data
      dataObj['data[0].value'] = (data[key].value / data[key].unit) / data[0].unit
      if (!dataObj['data[0].value']) return
      data.slice(1).forEach((v, k) => {
        dataObj[`data[${k + 1}].value`] = (dataObj['data[0].value'] / data[0].unit) * v.unit
      })
      console.info(dataObj)
      this.setData(dataObj)      
    },

    clear() {
      const dataObj = {}
      const ln = this.data.data.length
      for (let i = 0; i < ln; i++) {
        dataObj[`data[${i}].value`] = ''
      }
      this.setData(dataObj)
    }
  }
})
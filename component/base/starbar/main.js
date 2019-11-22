Component({

  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom'],

  properties: {

    total: {
      type: Number,
      value: 5
    },

    star: {
      type: Number,
      value: 0
    },
    
    size: {
      type: String,
      value: '10pt'
    }
  },

  data: {
    list: []
  },

  observers: {
    'total, star'(total, star) {
      const list = Array(total).fill(0).map((v, k) => {
        const id = k
        const icon = k <= star ? 'icon-starfill' : 'icon-star'
        return { id, icon }
      })
      this.setData({ list })
    }
  }
})

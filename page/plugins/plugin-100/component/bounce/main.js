Component({

  options: {
    multipleSlots: true
  },

  properties: {
    title: String
  },

  externalClasses: [
    'custom',
    'custom-content'
  ],

  lifetimes: {
    attached() {
      this.drawer = this.selectComponent('#drawer')
    }
  },

  methods: {

    open() {
      this.drawer.open()
    },

    close() {
      this.drawer.close()
    }
  }
})
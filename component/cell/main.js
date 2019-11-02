Component({
  options: {
    multipleSlots: true
  },
  externalClasses: ['custom', 'custom-content'],
  properties: {
    label: String,
    labelWidth: {
      type: String,
      value: 220
    },
    labelHide: {
      type: Boolean,
      value: false
    },
    align: {
      type: String,
      value: 'left'
    }
  }
})

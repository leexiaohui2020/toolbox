const data = [
  { id: 'kA', title: '千安', value: '', unit: 1 },
  { id: 'A', title: '安', value: '', unit: 1000 },
  { id: 'mA', title: '豪安', value: '', unit: 1000000 },
  { id: 'μA', title: '微安', value: '', unit: 1000000000 },
]

Page.createTool({

  toolId: 795,
  toolName: '电流换算',
  toolCate: [103],

  data: {
    data
  }
})

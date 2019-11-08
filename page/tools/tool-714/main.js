const data = [
  { id: 'm/s', title: '米/秒', value: '', unit: 1 },
  { id: 'km/h', title: '千米/时', value: '', unit: 3.6 },
  { id: 'in/s', title: '英寸/秒', value: '', unit: 39.370079 },
  { id: 'km/s', title: '千米/秒', value: '', unit: 0.001 },
  { id: 'c', title: '光速', value: '', unit: 3.3356e-9 },
  { id: 'mach', title: '马赫', value: '', unit: 0.0029386 },
  { id: 'mile/h', title: '英里/时', value: '', unit: 2.236936 }
]

Page.createTool({

  toolId: 714,
  toolName: '速度换算',
  toolCate: [103],

  data: {
    data
  }
})

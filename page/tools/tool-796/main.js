const data = [
  {
    "id": "mHz",
    "title": "毫赫兹",
    "value": "",
    "unit": 1
  },
  {
    "id": "Hz",
    "title": "赫兹",
    "value": "",
    "unit": 0.001
  },
  {
    "id": "kHz",
    "title": "千赫兹",
    "value": "",
    "unit": 0.000001
  },
  {
    "id": "MHz",
    "title": "兆赫兹",
    "value": "",
    "unit": 1e-9
  },
  {
    "id": "GHz",
    "title": "千兆赫兹",
    "value": "",
    "unit": 1.0000000000000002e-12
  },
  {
    "id": "THz",
    "title": "太赫兹",
    "value": "",
    "unit": 1e-15
  },
  {
    "id": "rpm",
    "title": "旋转次数/分钟",
    "value": "",
    "unit": 0.06
  },
  {
    "id": "deg/s",
    "title": "角度/秒",
    "value": "",
    "unit": 0.36
  },
  {
    "id": "rad/s",
    "title": "弧度/秒",
    "value": "",
    "unit": 0.006283185307179587
  }
]

Page.createTool({

  toolId: 796,
  toolName: '频率换算',
  toolCate: [103],

  data: {
    data
  }
})

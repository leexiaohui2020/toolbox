const data = [
  {
    "id": "kV",
    "title": "千伏",
    "value": "",
    "unit": 1
  },
  {
    "id": "V",
    "title": "伏特",
    "value": "",
    "unit": 1000
  },
  {
    "id": "mV",
    "title": "毫伏",
    "value": "",
    "unit": 1000000
  },
  {
    "id": "μV",
    "title": "微伏",
    "value": "",
    "unit": 1000000000
  }
]

Page.createTool({

  toolId: 794,
  toolName: '电压换算',
  toolCate: [103],

  data: {
    data
  }
})

const data = [
  {
    "id": "C",
    "title": "摄氏度",
    "value": "",
    "unit": 1
  },
  {
    "id": "K",
    "title": "华氏度",
    "value": "",
    "unit": 33.8
  },
  {
    "id": "hPa",
    "title": "开氏度",
    "value": "",
    "unit": 274.15
  },
  {
    "id": "Ra",
    "title": "兰氏度",
    "value": "",
    "unit": 493.47
  },
  {
    "id": "Re",
    "title": "列氏度",
    "value": "",
    "unit": 0.8
  }
]

Page.createTool({

  toolId: 716,
  toolName: '温度换算',
  toolCate: [103],

  data: {
    data
  }
})

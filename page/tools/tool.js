export const cates = [
  {
    id: 100,
    name: '加密解密',
    icon: 'cate-lock',
    color: 'blue'
  },
  {
    id: 101,
    name: '文字编辑',
    icon: 'cate-text',
    color: 'blue'
  },
  {
    id: 102,
    name: '编程开发',
    icon: 'cate-console',
    color: 'orange'
  },
  {
    id: 103,
    name: '单位换算',
    icon: 'cate-transfer',
    color: 'red'
  },
  {
    id: 104,
    name: '日期时间',
    icon: 'cate-calendar',
    color: 'blue'
  },
  {
    id: 105,
    name: '图形图像',
    icon: 'cate-picture',
    color: 'orange'
  },
  {
    id: 106,
    name: '金融理财',
    icon: 'cate-bank',
    color: 'red'
  },
  {
    id: 107,
    name: '生活日常',
    icon: 'cate-qrcode',
    color: 'green'
  }
]

export const tools = [
  {
    id: 654,
    name: '计算器',
    cate: 106
  },
  {
    id: 655,
    name: '国债计算器',
    cate: 106
  },
  {
    id: 656,
    name: '贷款计算器',
    cate: 106
  },
  {
    id: 657,
    name: 'MD5加密',
    cate: 100
  },
  {
    id: 659,
    name: '金额数字转大写',
    cate: 106
  },
  {
    id: 660,
    name: 'UUID生成',
    cate: 100
  },
  {
    id: 661,
    name: '理财计算器',
    cate: 106
  },
  {
    id: 663,
    name: '随机密码生成',
    cate: 100
  },
  {
    id: 666,
    name: 'URL编码/解码',
    cate: 102
  },
  {
    id: 668,
    name: '颜色值RGB/HEX转换',
    cate: 102
  },
  {
    id: 670,
    name: 'Unicode编码转换',
    cate: 100
  },
  {
    id: 671,
    name: '中文简体繁体转换',
    cate: 101
  }
]

// 隐藏没有插件的分类
cates.forEach(item => {
  Object.defineProperty(item, 'hide', {
    get() {
      return !tools.find(v => v.cate == item.id)
    }
  })
})

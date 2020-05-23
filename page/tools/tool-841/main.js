Page.createTool({
  toolId: 841,
  toolName: '万圣节头像生成器',
  toolCate: [105],
  toolCreatedAt: new Date('2019/11/11'),

  data: {
    imgList: Array(10).fill(0).map((v, k) => {
      return `http://www.atoolbox.net/Images/HappyHalloween/avatar${k}.png`
    })
  }
})

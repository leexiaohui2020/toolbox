Page.createTool({
  toolId: 880,
  toolName: '戴口罩头像生成器',
  toolCate: [105],
  toolCreatedAt: new Date('2020/2/2'),

  data: {
    maskImgList: Array(12).fill(
      App.$api.proxy.getImage('tool-880')
    ).map((v, k) => {
      return `${v}/mask${k}.png`
    })
  }
})

Page.createTool({
  toolId: 841,
  toolName: '万圣节头像生成器',
  toolCate: [105],

  data: {
    imgList: Array(10).fill(
      App.$api.proxy.getImage('tool-841')
    ).map((v, k) => {
      return `${v}/avatar${k}.png`
    })
  }
})

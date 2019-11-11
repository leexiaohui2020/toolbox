Page.createTool({
  toolId: 803,
  toolName: '圣诞帽头像生成器',
  toolCate: [105],

  data: {
    hatImgList: Array(10).fill(
      App.$api.proxy.getImage('tool-803')
    ).map((v, k) => {
      return `${v}/hat${k}.png`
    }) 
  }
})
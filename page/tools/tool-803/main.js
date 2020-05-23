Page.createTool({
  toolId: 803,
  toolName: '圣诞帽头像生成器',
  toolCate: [105],
  toolCreatedAt: new Date('2019/11/11'),

  data: {
    hatImgList: Array(10).fill(0).map((v, k) => {
      return `http://www.atoolbox.net/Images/MerryChristmas/hat${k}.png`
    }) 
  }
})

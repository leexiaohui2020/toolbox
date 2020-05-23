Page.createTool({
  toolId: 880,
  toolName: '戴口罩头像生成器',
  toolCate: [105],
  toolCreatedAt: new Date('2020/2/2'),

  data: {
    maskImgList: Array(12).fill(0).map((v, k) => {
      return `http://www.atoolbox.net/Images/Masks/Mask-${k + 1}.png`
    })
  }
})

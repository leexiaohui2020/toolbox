Page.createTool({
  toolId: 944,
  toolName: '毕业帽头像生成器',
  toolCate: [105],
  toolCreatedAt: new Date('2020/05/23'),
  toolCover: 'https://s1.ax1x.com/2020/05/25/t9SRsK.md.png',

  data: {
    hatImgList: Array(8).fill(0).map((v, k) => {
      return `http://www.atoolbox.net/Images/GraduationCaps/${k + 1}.png`
    })
  }
})

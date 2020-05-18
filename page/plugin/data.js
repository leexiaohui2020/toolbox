export default [
  {
    id: 102,
    name: '许愿树',
    path: '/page/plugins/plugin-102/home/main'
  },
  {
    id: 101,
    name: '漫画屋'
  },
  // {
  //   id: 100,
  //   name: '纯音乐频道'
  // },
].map(item => Object.assign({
  path: `/page/plugins/plugin-${item.id}/main`,
  image: `/page/plugins/plugin-${item.id}/main.png`
}, item))

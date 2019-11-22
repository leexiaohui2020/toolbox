export default [
  {
    id: 100,
    name: '纯音乐频道'
  },
  {
    id: 101,
    name: '漫画频道'
  }
].map(item => Object.assign({
  path: `/page/plugins/plugin-${item.id}/main`,
  image: `/page/plugins/plugin-${item.id}/main.png`
}, item))

const { createStorage } = App.$utils

const plugins = [
  {
    id: 104,
    name: '食谱猫',
    path: '/page/plugins/plugin-104/page/menu/main'
  },
  {
    id: 101,
    name: '漫画屋'
  },
  {
    id: 103,
    name: '管理后台',
    path: '/page/plugins/plugin-103/page/home/main',
    hidden: true
  },
  // {
  //   id: 102,
  //   name: '许愿树',
  //   path: '/page/plugins/plugin-102/home/main'
  // },
  // {
  //   id: 100,
  //   name: '纯音乐频道'
  // },
].map(item => Object.assign({
  path: `/page/plugins/plugin-${item.id}/main`,
  // image: `/page/plugins/plugin-${item.id}/main.png`,
  image: `/img/plugins/${item.id}.png`
}, item))

export default createStorage('plugins_manager', {

  statics: {

    // 插件数据
    plugins() {
      return plugins.map(item => {
        const node = this.findOne({ id: item.id })
        return Object.assign(item, {
          hidden: Boolean(node ? node.hidden : item.hidden)
        })
      })
    },

    // 把数据绑定到页面
    bind() {
      return page => {
        const pluginWatcher = plugin => {
          page.setData({
            plugins: plugin.plugins,
            hasPlugin: plugin.plugins.filter(v => !v.hidden).length !== 0
          })
        }
        this.watch(pluginWatcher, true)
        page.unbind = () => this.unwatch(pluginWatcher)
      }
    },
  }
})

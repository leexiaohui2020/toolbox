const { createStorage } = App.$utils

const plugins = [
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

export default createStorage('plugins_manager', {

  statics: {

    // 插件数据
    plugins() {
      return plugins.map(item => {
        const node = this.findOne({ id: item.id })
        return Object.assign(item, {
          hidden: Boolean(node && node.hidden)
        })
      })
    },

    // 把数据绑定到页面
    bind() {
      return page => {
        const pluginWatcher = plugin => {
          page.setData({ plugins: plugin.plugins })
        }
        this.watch(pluginWatcher, true)
        page.unbind = () => this.unwatch(pluginWatcher)
      }
    },
  }
})

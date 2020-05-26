const { createStorage } = App.$utils

const plugins = [
  {
    id: 100,
    name: '纯音乐频道',
    path: '/page/plugins/plugin-100/main',
    image: 'https://s1.ax1x.com/2020/05/25/t99tBT.png',
    hidden: false,
    enable: false,
  },
  {
    id: 101,
    name: '漫画屋',
    path: '/page/plugins/plugin-101/main',
    image: 'https://s1.ax1x.com/2020/05/25/t998cq.png',
    hidden: false,
    enable: true,
  },
  {
    id: 102,
    name: '许愿树',
    path: '/page/plugins/plugin-102/home/main',
    image: 'https://s1.ax1x.com/2020/05/25/t99YuV.png',
    hidden: false,
    enable: false,
  },
  {
    id: 103,
    name: '管理后台',
    path: '/page/plugins/plugin-103/page/home/main',
    image: 'https://s1.ax1x.com/2020/05/25/t9933n.png',
    hidden: true,
    enable: true,
  },
  {
    id: 104,
    name: '食谱猫',
    path: '/page/plugins/plugin-104/page/menu/main',
    image: 'https://s1.ax1x.com/2020/05/25/t99Gj0.png',
    hidden: false,
    enable: true,
  },
].filter(item => item.enable);

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

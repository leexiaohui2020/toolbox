// 食谱插件相关接口
// ====================

// 获取食材分类
export function getMenu() {
  return this.request.post(this.getURL('/shipu/menu'))
}

// 获取食材分类详情
export function getMenuItem(id) {
  return this.request.post(this.getURL('/shipu/getMenuItem'), { id })
}

// 获取食材做法大全
export function getItemDetail(id) {
  return this.request.post(this.getURL('/shipu/getItemDetail'), { id })
}

// 获取菜谱做法
export function getCaiPu(id) {
  return this.request.post(this.getURL('/shipu/getCaiPu'), { id })
}

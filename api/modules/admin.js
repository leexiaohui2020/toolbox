const defaultsHeader = {}

// 设置Header
export function setHeader(opts) {
  Object.assign(defaultsHeader, opts)
}

// Post中转
function post(url, data, header, useCache = false) {
  return this.request.post(this.getURL(`/admin/${url}`), data, Object.assign(defaultsHeader, header), useCache)
}

// 管理员登录
export function login(opts) {
  return post.call(this, 'login', opts)
}

// 首页数据
export function homeData() {
  return post.call(this, 'homeData', {}, {}, true)
}

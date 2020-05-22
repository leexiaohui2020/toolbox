// 管理员登录
export function login(opts) {
  return this.request.post(this.getURL('/admin/login'), opts, {}, false)
}

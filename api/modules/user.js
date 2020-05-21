export function login(code) {
  return this.request.post(this.getURL('/api/user/login'), { code })
}

export function setUserInfo(userInfo) {
  //  同步userInfo 到本地
  App.$user.setData({ userInfo })
  return this.request.post(this.getURL('/api/user/setUserInfo'),  userInfo )
}

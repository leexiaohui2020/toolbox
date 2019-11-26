export function login(code) {
  return this.request.post(this.getURL('/api/user/login'), { code })
}

export function setUserInfo(data) {
  return this.request.post(this.getURL('/api/user/setUserInfo'), data)
}

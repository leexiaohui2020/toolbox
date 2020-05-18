export function push(opts) {
  return this.request.post(this.getURL('/api/wish/push'), opts)
}

export function list(opts) {
  return this.request.post(this.getURL('/api/wish/list'), opts)
}

export function like(opts) {
  return this.request.post(this.getURL('/api/wish/like'), opts)
}

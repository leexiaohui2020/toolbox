export function getOptions() {
  return this.request.post(this.getURL('/cartoon/getOptions'))
}

export function getList(data) {
  return this.request.post(this.getURL('/cartoon/getList'), data)
}

export function getUrlKey(mid) {
  return this.request.post(this.getURL('/cartoon/getUrlKey'), { mid })
}

export function getChapter(mid) {
  return this.request.post(this.getURL('/cartoon/getChapter'), { mid })
}

export function getComment(data) {
  return this.request.post(this.getURL('/cartoon/getComment'), data)
}

export function getPaper(data) {
  return this.request.post(this.getURL('/cartoon/getPaper'), data)
}

export function getSearch(data) {
  return this.request.post(this.getURL('/cartoon/getSearch'), data)
}

export function getImage(url, ua) {
  const eUa = encodeURIComponent(ua)
  const eUrl = encodeURIComponent(url)
  return this.getURL(`/cartoon/getImage?url=${eUrl}&userAgent=${eUa}`)
}

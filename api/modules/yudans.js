export function getList(data) {
  return this.request.post(this.getURL('/yudans/list'), data)
}

export function getDetail(no) {
  return this.request.post(this.getURL('/yudans/detail'), { no })
}

export function getComment(data) {
  return this.request.post(this.getURL('/yudans/comment'), data)
}

export function getPic(id) {
  return this.request.get(this.getURL(`/yudans/pic/${id}`))
}

export function getMp3(id) {
  return this.request.get(this.getURL(`/yudans/mp3/${id}`))
}

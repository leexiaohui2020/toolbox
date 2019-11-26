export function image(img) {
  return this.request.post(this.getURL('/weixin/imgSecCheck'), { img })
}

export function msg(content) {
  return this.request.post(this.getURL('/weixin/msgSecCheck'), { content })
}

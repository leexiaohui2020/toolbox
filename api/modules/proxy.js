export async function getIdenticon(text, size = 420) {
  return this.getURL(`/identicon?text=${text}&size=${size}`)
}

export async function getBingWallPaper(data, size) {
  return this.getURL(`/proxy/getBingWallPaper?date=${date}&size=${size}`)
}

export function createGif(id, _input) {
  const input = _input.join('%25%23')
  return this.request.post(this.getURL('/proxy/createGif'), { id, input })
}

export function getImage(path) {
  return this.getURL(`/public/image/${path}`)
}

export function getBilibiliCoverURL(avNumber) {
  return this.request.post(this.getURL('/proxy/getBilibiliAvCover'), { avNumber })
}

export function getChineseCommercialCode(content) {
  return this.request.post(this.getURL('/proxy/getChineseCommercialCode'), { content })
}

// 动物识别接口
export function getAnimalClassifyInfo(img) {
  return this.request.post(this.getURL('/proxy/getAnimalClassifyInfo'), { img })
}

// 植物识别接口
export function getPlantClassifyInfo(img) {
  return this.request.post(this.getURL('/proxy/getPlantClassifyInfo'), { img })
}

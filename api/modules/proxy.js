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
  return this.request.post(this.getURL(`/proxy/getBilibiliAvCover`), { avNumber })
}

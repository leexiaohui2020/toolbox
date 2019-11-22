export default (net, config) => {
  const modules = {}
  const getURL = path => `${config.hostname}${path}`

  modules.getOptions = () => net({
    url: getURL('/cartoon/getOptions'),
    method: 'POST'
  })

  modules.getList = data => net({
    url: getURL('/cartoon/getList'),
    method: 'POST',
    data
  })

  modules.getUrlKey = mid => net({
    url: getURL('/cartoon/getUrlKey'),
    method: 'POST',
    data: { mid }
  })

  modules.getChapter = mid => net({
    url: getURL('/cartoon/getChapter'),
    method: 'POST',
    data: { mid }
  })
  
  modules.getComment = data => net({
    url: getURL('/cartoon/getComment'),
    method: 'POST',
    data
  })

  modules.getPaper = data => net({
    url: getURL('/cartoon/getPaper'),
    method: 'POST',
    data
  })

  modules.getImage = (url, ua) => getURL(`/cartoon/getImage?url=${encodeURIComponent(url)}&userAgent=${encodeURIComponent(ua)}`)
  return modules
}

export default (net, config) => {
  const modules = {}
  const getURL = path => `${config.hostname}${path}`

  modules.getList = (data) => net({
    url: getURL('/yudans/list'),
    method: 'POST',
    data
  })

  modules.getDetail = no => net({
    url: getURL('/yudans/detail'),
    method: 'POST',
    data: { no }
  })

  modules.getComment = (data) => net({
    url: getURL('/yudans/comment'),
    method: 'POST',
    data
  })
  
  modules.getPic = id => net({
    url: getURL(`/yudans/pic/${id}`)
  })

  modules.getMp3 = id => net({
    url: getURL(`/yudans/mp3/${id}`)
  })
  return modules
}

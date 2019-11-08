export default (net, config) => {
  const modules = {}

  modules.image = (img) => net({
    url: `${config.hostname}/weixin/imgSecCheck`,
    method: 'POST',
    data: {
      img
    }
  })

  modules.msg = (content) => net({
    url: `${config.hostname}/weixin/msgSecCheck`,
    method: 'POST',
    data: {
      content
    }
  })

  return modules
}

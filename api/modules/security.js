export default (net, config) => {
  const modules = {}

  modules.image = (img) => net({
    url: `${config.hostname}/weixin/imgSecCheck`,
    method: 'POST',
    data: {
      img
    }
  })

  return modules
}

export default (net, config) => {
  const modules = {}
  const getURL = path => `${config.hostname}${path}`

  modules.login = code => net({
    url: getURL('/api/user/login'),
    method: 'POST',
    data: { code }
  })
  
  modules.setUserInfo = data => net({
    url: getURL('/api/user/setUserInfo'),
    method: 'POST',
    data
  })
  return modules
}

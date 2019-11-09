export default (net, config) => {
  const modules = {}

  modules.getBingWallPaper = (date, size) => {
    return new Promise((resolve) => {
      resolve(`${config.hostname}/proxy/getBingWallPaper?date=${date}&size=${size}`)
    })
  }

  modules.createGif = (id, input) => net({
    url: `${config.hostname}/proxy/createGif`,
    method: 'POST',
    data: {
      id,
      input: input.join('%25%23')
    }
  })
  return modules
}

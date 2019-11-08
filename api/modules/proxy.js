export default (net, config) => {
  const modules = {}

  modules.getBingWallPaper = (date, size) => {
    return new Promise((resolve) => {
      resolve(`${config.hostname}/proxy/getBingWallPaper?date=${date}&size=${size}`)
    })
  }

  return modules
}

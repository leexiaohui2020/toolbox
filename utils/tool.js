import { tools } from '../page/tools/tool'

export function searchTool(kw) {
  const re = RegExp(kw)
  return tools.filter(v => re.test(v.name))  
}

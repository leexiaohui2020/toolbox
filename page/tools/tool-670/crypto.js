export function AsciiToUnicode(val) {
  if (!val) return new Error('请填写转换的内容')
  let res = ''
  for (let i = 0; i < val.length; i++) {
    res += `&#${val.charCodeAt(i)};`
  }
  return res
}

export function UnicodeToAscii(val = '') {
  const code = val.match(/&#(\d+);/g)
  if (code === null) {
    return new Error('请填写合法的Unicode代码')
  }
  let res = ''
  for (let i = 0; i < code.length; i++) {
    res += String.fromCharCode(code[i].replace(/[&#;]/g, ''))
  }
  return res
}

export function UnicodeToChinese(val) {
  return unescape(val.replace(/\\u/gi, '%u'))
}

export function ChineseToUnicode(val) {
  const txt = escape(val).toLocaleLowerCase().replace(/%u/gi, '\\u')
  return txt.replace(/%7b/gi, '{').replace(/%7d/gi, '}').replace(/%3a/gi, ':').replace(/%2c/gi, ',').replace(/%27/gi, '\'').replace(/%22/gi, '"').replace(/%5b/gi, '[').replace(/%5d/gi, ']').replace(/%3D/gi, '=').replace(/%20/gi, ' ').replace(/%3E/gi, '>').replace(/%3C/gi, '<').replace(/%3F/gi, '?').replace(/%5c/gi, '\\')
}
export default [
  {
    "text": "匹配中文字符",
    "regexp": "[\\u4e00-\\u9fa5]"
  },
  {
    "text": "匹配双字节字符(包括汉字在内)",
    "regexp": "[^\\x00-\\xff]"
  },
  {
    "text": "匹配空白行",
    "regexp": "\\n\\s*\\r"
  },
  {
    "text": "匹配Email地址",
    "regexp": "[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?"
  },
  {
    "text": "匹配网址URL",
    "regexp": "[a-zA-z]+://[^\\s]*"
  },
  {
    "text": "匹配国内电话号码",
    "regexp": "\\d{3}-\\d{8}|\\d{4}-\\{7,8}"
  },
  {
    "text": "匹配中国邮政编码",
    "regexp": "[1-9]\\d{5}(?!\\d)"
  },
  {
    "text": "匹配18位身份证号",
    "regexp": "^(\\d{6})(\\d{4})(\\d{2})(\\d{2})(\\d{3})([0-9]|X)$"
  },
  {
    "text": "匹配(年-月-日)格式日期",
    "regexp": "([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))"
  },
  {
    "text": "匹配正整数",
    "regexp": "^[1-9]\\d*$"
  },
  {
    "text": "匹配负整数",
    "regexp": "^-[1-9]\\d*$"
  },
  {
    "text": "匹配整数",
    "regexp": "^-?[1-9]\\d*$"
  },
  {
    "text": "匹配非负整数（正整数 + 0）",
    "regexp": "^[1-9]\\d*|0$"
  },
  {
    "text": "匹配非正整数（负整数 + 0）",
    "regexp": "^-[1-9]\\d*|0$"
  },
  {
    "text": "匹配正浮点数",
    "regexp": "^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$"
  },
  {
    "text": "匹配负浮点数",
    "regexp": "^-[1-9]\\d*\\.\\d*|-0\\.\\d*[1-9]\\d*$"
  }
]
export function copyText(data) {
  wx.setClipboardData({
    data,
    success() {
      wx.showToast({ title: '复制成功', icon: 'success' })
    },
    fail() {
      wx.showToast({ title: '复制失败', icon: 'none' })
    }
  })
}

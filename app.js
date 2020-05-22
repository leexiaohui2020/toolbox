import api from 'api/api.js'
import user from 'core/user'
import * as utils from 'utils/utils'
import 'core/tools'
import 'core/admin'

App({

  onLaunch() {
    this.getUserInfo()
    this.getSystemInfo()
  },

  // 获取用户信息
  getUserInfo() {

    // 获取到用户信息
    const onGetUserInfo = res => {
      api.user.setUserInfo(res.userInfo)
    }

    // 查询授权
    const onGetSetting = res => {
      if (res.authSetting['scope.userInfo']) {
        wx.getUserInfo({ success: onGetUserInfo })
      }
    }

    wx.getSetting({ success: onGetSetting })
  },

  // 获取设备尺寸等相关信息
  getSystemInfo() {
    wx.getSystemInfo({
      success: res => {
        App.systemInfo = res
      }
    })
  }
})
App.$api = api
App.$user = user;
App.$utils = utils

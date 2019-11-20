import * as data from 'data'
import * as utils from 'utils/utils'
import api from 'api/api.js'
import 'core/tool'

App({})
App.$api = api
App.$utils = utils
utils.computedData(App.$data = {}, data)

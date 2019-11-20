import {
  storeLike,
  storeHistory
} from '../../store'

Component({

  options: {
    addGlobalClass: true
  },

  data: {
    pause: true,
    detail: null,
    isLiked: false
  },
  
  lifetimes: {

    attached() {
      this.storeLikeWatcher = this.onStoreLikeChange.bind(this)
      storeLike.watch(this.storeLikeWatcher)
      App.$utils.createAudio().bind(this)
    },

    detached() {
      storeLike.unwatch(this.storeLikeWatcher)
    }
  },

  pageLifetimes: {
    show() {
      this.updatePause()
    }
  },
  
  methods: {

    init(songId, autoplay = false) {
      const detail = {}
      const { manager } = this.$audio

      const callBack = () => {
        const { no } = detail
        const isLiked = storeLike.isLike(no)
        if (!storeHistory.findOne({ no })) {
          storeHistory.addOne(detail, true)
        }
        console.info(detail)
        this.setData({ detail, isLiked })
        this.triggerEvent('init', { no })
      }

      const onGotMp3 = ({ data }) => {
        this.stop()
        manager.src = data
        manager.title = detail.title
        manager.singer = detail.author
        manager.coverImgUrl = detail.pictureURL
      }
      const onGotDetail = ({ data }) => {
        if (data.status !== 'ok' || !data.data) {
          throw new Error(data.errmsg)
        }
        Object.assign(detail, data.data)
        return App.$api.yudans.getPic(detail.no)
      }
      const onGotPicture = ({ data }) => {
        detail.pictureURL = data
        return App.$api.yudans.getMp3(detail.no)
      }

      wx.showLoading({ title: '加载中' })
      return App.$api.yudans.getDetail(songId)
        .then(onGotDetail)
        .then(onGotPicture)
        .then(onGotMp3)
        .then(callBack)
        .finally(() => wx.hideLoading())
    },

    updatePause() {
      const pause = this.$audio.manager.paused
      this.setData({ pause })
    },

    onPlay() {
      this.updatePause()
    },
    onStop() {
      this.updatePause()
    },
    onEnded() {
      this.updatePause()
    },
    onPause() {
      this.updatePause()
    },
    onPrev() {
      const { no } = this.data.detail
      const item = storeHistory.findOne({ no })
      if (item) {
        this.init(item.prev().no, true)
      }
    },
    onNext() {
      const { no } = this.data.detail
      const item = storeHistory.findOne({ no })
      if (item) {
        this.init(item.next().no, true)
      }
    },

    toggleLike() {
      storeLike.toggle(this.data.detail)
    },
    toggleHandler() {
      this.data.pause ?
        this.play() :
        this.pause()
    },

    onStoreLikeChange(store) {
      const { no } = this.data.detail
      const isLiked = store.isLike(no)
      this.setData({ isLiked })
    }
  }
})

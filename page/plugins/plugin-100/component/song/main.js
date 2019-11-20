import {
  storeLike,
  storeHistory
} from '../../store'

Component({

  options: {
    addGlobalClass: true
  },

  properties: {
    data: {
      type: Object,
      value: null
    },

    pictureURL: {
      type: String,
      value: ''
    },

    currentNo: {
      type: Number,
      value: 0
    },

    showRemove: {
      type: Boolean,
      value: false
    }
  },

  data: {
    isLiked: false
  },

  lifetimes: {
    attached() {
      this.init()
      this.storeLikeWatcher = this.onStoreLikeChange.bind(this)
      storeLike.watch(this.storeLikeWatcher)
    },

    detached() {
      storeLike.unwatch(this.storeLikeWatcher)
    },
  },

  methods: {

    init() {
      this.setLiked()
      this.setPicture()
    },

    setLiked() {
      const { no } = this.data.data
      const isLiked = !!storeLike.findOne({ no })
      this.setData({ isLiked })
    },

    setPicture() {
      const { no } = this.data.data
      return App.$api.yudans.getPic(no).then(({ data }) => {
        this.setData({ pictureURL: data })
      })
    },

    tapHandler() {
      const { data } = this.data
      this.triggerEvent('ontap', { data })
    },

    toggleLiked() {
      const song = Object.assign({}, this.data.data)
      delete song.titleHtml
      delete song.authorHtml
      storeLike.toggle(song)
    },

    onStoreLikeChange(store) {
      const { no } = this.data.data
      const isLiked = store.isLike(no)
      this.setData({ isLiked })
    },

    removeHistory() {
      const { no } = this.data.data
      storeHistory.removeOne({ no })
    }
  }
})

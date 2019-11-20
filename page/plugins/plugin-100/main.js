import {
  storeLike,
  storeHistory
} from 'store'

Page({

  data: {
    likes: [],
    history: [],
    currentPlayNo: ''
  },

  onLoad() {
    this.player = this.selectComponent('#player')
    this.search = this.selectComponent('#search')
    this.comment = this.selectComponent('#comment')
    this.likebounce = this.selectComponent('#likebounce')
    this.historybounce = this.selectComponent('#historybounce')

    this.storeLikeWatcher = () => this.setLikes()
    this.storeHistoryWatcher = () => this.setHistory()

    storeLike.watch(this.storeLikeWatcher)
    storeHistory.watch(this.storeHistoryWatcher)

    this.setLikes()
    this.setHistory()
  },

  onUnload() {
    storeLike.unwatch(this.storeLikeWatcher)
    storeHistory.unwatch(this.storeHistoryWatcher)
  },

  onReachBottom() {
    // 获取下一页评论
    this.comment.getNextPage()
  },

  onShareAppMessage() {
    const { detail } = this.player.data
    const title = `【钢琴纯音乐】${detail.author} - ${detail.title}`
    const path = `/page/plugins/plugin-100/main?no=${detail.no}`
    const imageUrl = detail.pictureURL
    return { path, title, imageUrl }
  },

  openSearch() {
    this.search.open()
  },
  openLikeBounce() {
    this.likebounce.open()
  },
  openHistoryBounce() {
    this.historybounce.open()
  },

  setLikes() {
    const likes = storeLike.find()
    this.setData({ likes })
  },
  setHistory() {
    const history = storeHistory.find()
    this.setData({ history })
  },

  searchModalInitHandler() {
    const { no } = this.options
    if (no) {
      return this.player.init(no)
    }

    const song = storeHistory.findOne() || this.search.data.list[0]
    if (song) {
      this.player.init(this.options.no || song.no)
    }
  },
  playSong(e) {
    const { data } = e.detail
    this.player.init(data.no, true)
    this.search.close()
  },
  onPlayerInit(e) {
    const currentPlayNo = e.detail.no
    this.setData({ currentPlayNo })
  }
})

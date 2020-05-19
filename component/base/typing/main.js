/**
 * ========================================
 *              打字机效果组件
 * ========================================
 */

Component({

  externalClasses: ['custom'],

  properties: {
    // 打字内容
    content: String,

    // 延迟
    delay: {
      type: Number,
      value: 120
    },

    // 自动播放
    autoPlay: {
      type: Boolean,
      value: false
    },

    // 循环播放
    loop: {
      type: Boolean,
      value: false
    },

    // 循环播放间隔
    interval: {
      type: Number,
      value: 5000
    },

    // 是否显示光标
    showCursor: {
      type: Boolean,
      value: false
    },

    // 删除总用时
    clearTime: Number
  },

  data: {
    showText: ''
  },

  attached() {
    this.arr = this.data.content.split('')
    if (this.data.autoPlay) {
      this.play()
    }
  },

  methods: {

    play(content) {
      const next = () => setTimeout(() => {
        const showText = this.arr.slice(0, this.data.showText.length + 1).join('')
        this.setData({ showText }, () => {
          if (showText.length < this.arr.length) {
            this.play()
          } else if (this.data.loop) {
            setTimeout(() => this.clear(), this.data.interval)
          }
        })
      }, this.data.delay)

      if (content && content.length) {
        this.setData({ content })
        this.arr = content.split('')
        this.clear(next)
      } else {
        next()
      }
    },

    clear(fn) {
      let delay = 0
      if (this.data.clearTime && this.arr.length) {
        delay = this.data.clearTime / this.arr.length;
      } else {
        delay = this.data.delay
      }

      setTimeout(() => {
        const showText = this.data.showText.substr(0, this.data.showText.length - 1)
        this.setData({ showText }, () => {
          if (showText.length > 0) {
            this.clear(fn)
          } else if (typeof fn === 'function') {
            fn()
          } else if (this.data.loop) {
            this.play()
          }
        })
      }, delay)
    }
  }
})

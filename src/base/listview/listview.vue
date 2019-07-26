<template>
<scroll class="listview"
        :data="data"
        ref="listview"
        :listenScroll="listenScroll"
        :probeType="probeType"
        @scroll="scroll"
>
  <ul>
    <li v-for="(group,index) in data" :key="index" class="list-group" ref="listGroup">
      <h2 class="list-group-title">{{group.title}}</h2>
      <ul>
        <li @click="selectItem(item)" v-for="(item,index) in group.items" :key="index" class="list-group-item">
          <img class="avatar" v-lazy="item.avatar">
          <span class="name">{{item.name}}</span>
        </li>
      </ul>
    </li>
  </ul>
  <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
    <ul>
      <li v-for="(item,index) in shortcutList"
      :key="index" class="item"
      :data-index="index"
      :class="{'current':currentIndex==index}"
      >
        {{item}}
      </li>
    </ul>
  </div>
  <div class="list-fixed" v-show="fixedTitle" ref="fixed">
    <h1 class="fixed-title">{{fixedTitle}}</h1>
  </div>
</scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom.js'
// 每个元素的高度，height样式计算得到的
const ANCHOR_HEIGHT = 20
const TITLE_HEIGHT = 20

export default {
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      liheight: 10,
      diff: -1
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    selectItem(item) {
      // 向外派发事件
      this.$emit('select', item)
    },
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')
      let fristTouch = e.touches[0]
      this.touch.y1 = fristTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let fristTouch = e.touches[0]
      this.touch.y2 = fristTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight + this.liheight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          // console.log(this.currentIndex)
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group {
    // padding: 10px 0;
    .list-group-title {
      height: 20px;
      line-height: 20px;
      padding-left: 15px;
      margin-bottom: 10px;
      font-size: $font-size-small;
      color: $color-text-l;
      background:$color-highlight-background;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 5px 0;
      margin: 10px 5px;
      // border-bottom: 1px solid rgb(228, 228, 228);
      &:last-child {
        border: none;
        margin-bottom: 10px;
      }
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left 20px;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height :500px;
    padding: 200px 0;
    border-radius: 3px;
    text-align: center;
    font-family:Helvetica;
    .item {
      padding: 4px 0px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      font-weight: bold;
      &.current {
        color: $color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      margin-top: -1px;
      height: 20px;
      line-height: 20px;
      padding-left: 15px;
      font-size: $font-size-small;
      color: $color-text-l;
      background:$color-highlight-background;
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
<!-- 虚拟滚动。作者地址：https://blog.csdn.net/brokenkay/article/details/118566913 -->
<template>
  <div class="wrapper" ref="wrapper" @scroll="onScroll">
    <div class="background" :style="{ height: `${total_height}px` }"></div>
    <div class="list" ref="container">
      <div
        v-for="item in runList"
        :class="['line', getClass(item.data.type)]"
        :key="item"
      >
        <div class="item lt">{{ item.data.name }}</div>
        <div class="item gt">{{ item.data.value }}</div>
        <div v-if="item.data.type == 3" class="img-container">
          <img src="../../assets/default.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import city_data from './city.json'

export default {
  props: {
    cache_screens: {
      // 缓冲的屏幕数量
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      list: [], // 源数据
      runList: [], // 运行时的列表
      total_height: 0, // 列表总高度
      maxNum: 0, // 一屏幕容纳的最大数量
      distance: 0, // 存储滚动的距离
    }
  },
  mounted() {
    this.genData()
    this.init()
    this.getRunData()
  },
  methods: {
    getClass(type) {
      switch (type) {
        case 1:
          return 'one'
        case 2:
          return 'two'
        case 3:
          return 'three'
        default:
          return ''
      }
    },
    init() {
      const containerHeight = parseInt(
        getComputedStyle(this.$refs.wrapper).height
      )
      //一屏的最大数量
      this.maxNum = Math.ceil(containerHeight / this.min_height)
      console.log(`maxNum:${this.maxNum}`)
    },
    onScroll(e) {
      if (this.ticking) {
        return
      }
      this.ticking = true
      requestAnimationFrame(() => {
        this.ticking = false
      })
      const distance = e.target.scrollTop
      this.distance = distance
      this.getRunData(distance)
    },
    //二分法计算起始索引
    getStartIndex(scrollTop) {
      let start = 0,
        end = this.list.length - 1
      while (start < end) {
        const mid = Math.floor((start + end) / 2)
        const { top, height } = this.list[mid]
        if (scrollTop >= top && scrollTop < top + height) {
          start = mid
          break
        } else if (scrollTop >= top + height) {
          start = mid + 1
        } else if (scrollTop < top) {
          end = mid - 1
        }
      }
      return start
    },
    getRunData(distance = null) {
      //滚动的总距离
      const scrollTop = distance ? distance : this.$refs.container.scrollTop

      //在哪个范围内不执行滚动
      if (this.scroll_scale) {
        if (
          scrollTop > this.scroll_scale[0] &&
          scrollTop < this.scroll_scale[1]
        ) {
          return
        }
      }

      //起始索引
      let start_index = this.getStartIndex(scrollTop)
      start_index = start_index < 0 ? 0 : start_index

      //上屏索引
      let upper_start_index = start_index - this.maxNum * this.cache_screens
      upper_start_index = upper_start_index < 0 ? 0 : upper_start_index

      // 调整offset
      this.$refs.container.style.transform = `translate3d(0,${this.list[upper_start_index].top}px,0)`

      //中间屏幕的元素
      const mid_list = this.list.slice(start_index, start_index + this.maxNum)

      // 上屏
      const upper_list = this.list.slice(upper_start_index, start_index)

      // 下屏元素
      let down_start_index = start_index + this.maxNum

      down_start_index =
        down_start_index > this.list.length - 1
          ? this.list.length
          : down_start_index

      this.scroll_scale = [
        this.list[Math.floor(upper_start_index + this.maxNum / 2)].top,
        this.list[Math.ceil(start_index + this.maxNum / 2)].top,
      ]

      const down_list = this.list.slice(
        down_start_index,
        down_start_index + this.maxNum * this.cache_screens
      )

      this.runList = [...upper_list, ...mid_list, ...down_list]
    },
    //生成数据
    genData() {
      function getHeight(type) {
        switch (type) {
          case 1:
            return 50
          case 2:
            return 100
          case 3:
            return 150
          default:
            return ''
        }
      }
      let total_height = 0
      const list = city_data.map((data, index) => {
        const height = getHeight(data.type)
        const ob = {
          index,
          height,
          top: total_height,
          data,
        }
        total_height += height
        return ob
      })
      this.total_height = total_height //  列表总高度
      this.list = list
      this.min_height = 50 // 最小高度是50
    },
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 60px;
  overflow-y: scroll;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  .list {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}
.line {
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  .item {
    height: 100%;
    line-height: 40px;
    color: #999;
    &.lt {
      margin-left: 10px;
    }
    &.gt {
      margin-right: 10px;
    }
  }
  &.one {
    height: 50px;
  }
  &.two {
    height: 100px;
    .item {
      color: #666;
    }
  }
  &.three {
    height: 150px;
    .item {
      color: #005aa0;
    }
    .img-container {
      display: flex;
      align-items: center;
      img {
        width: 100px;
        height: 100px;
        margin-right: 10px;
      }
    }
  }
}
</style>
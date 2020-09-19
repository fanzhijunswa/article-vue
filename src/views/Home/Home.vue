<template lang="pug">
  .home-container
    van-nav-bar(class="app-nav-bar")
      van-button(
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
        to="/search"
      ) 搜索
    van-tabs
      van-tab(v-for="({id,name}) in channels" :title="name" :key="id + name")
        article-list(:channelId="id")
  </div>
</template>

<script>
import _ from 'lodash'
import articleList from './article-list'
import { getAllChannels } from '@/api'

export default {
  name: 'HomeIndex',
  components: {
    articleList
  },
  props: {},
  data () {
    return {
      channels: []
    }
  },
  computed: {},
  watch: {},
  async created () {
    try {
      await this.getAllChannels()
    } catch (e) {
      this.$Toast(e)
    }
  },
  mounted () {},
  methods: {
    getAllChannels () {
      return new Promise(async (resolve, reject) => {
        try {
          this.channels = _.get(await getAllChannels(), 'channels', [])
          resolve()
        } catch (e) {
          reject('频道获取失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="sass">
.home-container
  ::v-deep .van-nav-bar__title
    max-width: none
  .search-btn
    width: 277px
    height: 32px
    background: #5babfb
    border: none
    .van-icon
      font-size: 16px
    .van-button__text
      font-size: 14px
  .channel-tabs
    ::v-deep .van-tab
      border-right: 1px solid #edeff3
      border-bottom: 1px solid #edeff3
    ::v-deep .van-tabs__line
      bottom: 20px
      width: 15px !important
      height: 3px
      background: #3296fa
  .wap-nav-placeholder
    width: 33px
    flex-shrink: 0
  .wap-nav-wrap
    position: fixed
    right: 0
    width: 33px
    height: 43px
    background-color: #fff
    display: flex
    justify-content: center
    align-items: center
    opacity: 0.9
    .van-icon
      font-size: 24px
    &:before
      content: ""
      width: 1px
      background: url("./line.png") no-repeat
      background-size: contain
      position: absolute
      left: 0
      top: 0
      bottom: 0
</style>

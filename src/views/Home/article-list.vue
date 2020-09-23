<template lang="pug">
  .article-list(ref="article-list")
    van-pull-refresh(v-model="refreshing" @refresh="onRefresh")
      van-list(
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad")
        article-item(v-for="(article,index) of articles" :key="index" :article="article")
</template>

<script>
import _ from 'lodash'
import ArticleItem from './article-item'
import { getArticles } from '@/api'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channelId: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      timestamp: Date.now(),
      articles: [],
      page: 0,
      scrollTop: 0
    }
  },
  activated () {
    this.$refs['article-list'].scrollTop = this.scrollTop
  },
  computed: {},
  watch: {},
  mounted () {
    console.log(1)
    this.$refs['article-list'].onscroll = _.debounce(e => {
      this.scrollTop = e.target.scrollTop
    }, 50)
  },
  methods: {
    // 下拉刷新为0,上拉加载为1
    async onRefresh () {
      try {
        await this.getArticles(0)
        this.finished = false
      } catch (e) {
        console.warn('下拉刷新失败')
      } finally {
        this.refreshing = false
      }
    },
    async onLoad () {
      try {
        const results = await this.getArticles(1)
        !results.length && (this.finished = true)
      } catch (e) {
        console.warn('上拉加载失败')
      } finally {
        this.loading = false
      }
    },
    getArticles (flag) {
      return new Promise(async (resolve, reject) => {
        try {
          const { timestamp, channelId: channel_id } = this
          const { page, pre_timestamp, results } = await getArticles({
            channel_id,
            timestamp,
            with_top: 1
          })
          this.articles = !!flag ? [...this.articles, ...results] : results
          this.page = page
          !!pre_timestamp && (this.timestamp = pre_timestamp)
          resolve(results)
        } catch (e) {
          reject('文章获取失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="sass">
.article-list
  position: fixed
  left: 0
  right: 0
  bottom: 50px
  top: 90px
  overflow-y: auto
</style>

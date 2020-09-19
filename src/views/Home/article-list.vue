<template lang="pug">
  .article-list(ref="article-list")
    article-item(v-for="article of articles" :key="article.art_id" :article="article")
  </div>
</template>

<script>
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
      timestamp: Date.now(),
      articles: [],
      page: 0
    }
  },
  async created () {
    try {
      await this.getArticles()
    } catch (e) {
    }
  },
  computed: {},
  watch: {},
  mounted () {
  },
  methods: {
    getArticles () {
      return new Promise(async (resolve, reject) => {
        try {
          const { timestamp, channelId: channel_id } = this
          const { page, pre_timestamp, results } = await getArticles({
            channel_id,
            timestamp,
            with_top: 1
          })
          this.articles = [...results, ...this.articles]
          this.page = page
          this.timestamp = pre_timestamp
          resolve()
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

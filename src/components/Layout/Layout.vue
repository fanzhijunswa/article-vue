<template lang="pug">
#Layout
  .container
    keep-alive
      router-view
  .top
    Tabbar
</template>

<script>
import { mapActions } from 'vuex'
import Tabbar from './Tabbar'
export default {
  name: 'Layout',
  components: {
    Tabbar
  },
  activated () {

  },
  deactivated () {
  },
  async created () {
    !!localStorage.getItem('article_token') && await this.getUserInfo()
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('User', {
      getUserInfo: 'getUserInfo'
    })
  }
}
</script>

<style lang="sass" scoped>
#Layout
</style>

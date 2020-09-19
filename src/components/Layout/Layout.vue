<template lang="pug">
#Layout
  .container
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

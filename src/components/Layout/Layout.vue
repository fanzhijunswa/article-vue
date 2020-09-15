<template lang="pug">
#Layout
  .container
    router-view
  .top
    Tabbar
</template>

<script>
import Tabbar from './Tabbar'
export default {
  name: 'Layout',
  components: {
    Tabbar
  },
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style lang="sass" scoped>
#Layout
</style>

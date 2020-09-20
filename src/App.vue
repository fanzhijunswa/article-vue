<template lang="pug">
#App
  keep-alive(include="Layout")
    router-view
</template>

<script>
export default {
  components: {
  }
}
</script>
<style lang="sass">
@import '@/styles/_color.sass'
</style>

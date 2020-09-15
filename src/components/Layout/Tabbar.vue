<template lang="pug">
#Tabbar
  van-tabbar(v-model="active")
    van-tabbar-item(icon="home-o" name="home" to="/") 主页
    van-tabbar-item(icon="search" name="qa" to="/qa") 问答
    van-tabbar-item(icon="friends-o" name="video" to="/video") 视频
    van-tabbar-item(icon="setting-o" name="my" to="/my") 我的
</template>
<script>
export default {
  name: 'Tabbar',
  data () {
    return {
      active: 'home'
    }
  }
}
</script>
<style lang='sass' scoped>
</style>

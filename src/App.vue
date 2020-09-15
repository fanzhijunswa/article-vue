<template>
  <div id="app">
    <div id="nav">
      <h2>哈哈哈</h2>
      <div class="test"></div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="sass">
@import '@/styles/_color.sass'
.test
  width: 200px
  height: 200px
  background-color: $color-red
</style>

<template>
  <div id="app">
    <div id="nav">
      <h2>哈哈哈</h2>
      <div class="test"></div>
      <span>大大大</span>
    </div>
    <router-view/>
  </div>
</template>

<style lang="sass">
@import '@/styles/_color.sass'
.test
  width: 75px
  height: 75px
  background-color: $color-red
</style>

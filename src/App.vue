<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import $store from './store'
export default {
  name: 'app',
  $store,
  data() {
    return {
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>

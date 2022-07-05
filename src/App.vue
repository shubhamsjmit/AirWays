<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/views/Header.vue'

export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  components: {
    Header,
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

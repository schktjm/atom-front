<template>
  <div id="app">
    <Header/>
    <div class="page-body">
      <router-view/>
    </div>
  </div>
</template>

<script>
    import Header from './components/Header'

    export default {
        components: {Header}
    }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100vh;
    height: 100%;
  }

  .page-body {
    padding: 10px;
  }

</style>

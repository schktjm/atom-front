<template>
  <header style="margin-bottom: 10px;">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
             background-color="#f44336"
             text-color="#fff"
             active-text-color="#ffb300"
             :router="true"
    >
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/map">Map</el-menu-item>
    </el-menu>
  </header>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                activeIndex: '/'
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

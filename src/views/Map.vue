<template>
  <div class="map-style">
    <div class="white-text-style"><span>coming soon</span></div>
  </div>
</template>

<script>
    export default {
        name: 'Map'
    }
</script>

<style lang="scss" scoped>
  .map-style {
    height: 100vh;
    background-image: url('https://i.gyazo.com/04779206bd4b747c24a63559b82fecc3.png');
    -webkit-background-size: cover;
    background-size: cover;
    position: relative;

    &:before {
      content: '';
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    }

    .white-text-style {
      position: absolute;
      width: 100%;
      text-align: center;

      span {
        color: #ffffff;
        font-size: 32px;
      }
    }


  }
</style>

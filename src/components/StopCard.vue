<template>
  <el-card shadow="never" body-style="padding: 10px">
    <div class="stop-card-style">
      <div class="times-style">
        <div v-if="stop.arrive > 0">{{getHM(stop.arrive)}}</div>
        <div v-if="stop.leave > 0">{{getHM(stop.leave)}}</div>
      </div>
      <div>
        <span class="locate-name-style">{{stop.name}}</span>
      </div>

    </div>
  </el-card>
</template>

<script>
    export default {
        name: 'StopCard',
        props: {
            stop: {
                type: Object,
                default: () => ({
                    arrive: {
                        type: Number,
                        default: -1
                    },
                    leave: {
                        type: Number,
                        default: -1
                    },
                    name: String
                })
            }
        },
        data() {
            return {}
        },
        methods: {
            getHM(unitime) {
                const date = new Date(unitime);
                const hh = ('00' + date.getHours()).slice(-2);
                const mm = ('00' + date.getMinutes()).slice(-2);
                return `${hh}:${mm}`;
            },
        }
    }
</script>

<style lang="scss" scoped>
  .stop-card-style {
    display: flex;
    align-items: center;

    .times-style {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      border: 1px rgba(0, 0, 0, 0.3) solid;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
    }

    .locate-name-style {
      font-size: 28px;
      padding: 0 20px;
    }
  }
</style>

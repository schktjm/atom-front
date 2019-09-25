<template>
  <div>
    <div class="title-style">
      {{getHM(data.startTime)}}
      <i class="fas fa-long-arrow-alt-right"></i>
      {{getHM(data.endTime)}}
      <span class="min-font-style">{{getSubTime(data.startTime, data.endTime)}}分 {{data.fare}}円</span>
    </div>
    <div>
      <stop-card :stop="{arrive: data.route[0]['getOn'], name: data.route[0]['frm']}"></stop-card>
      <div v-for="(r,idx) in data.route" :key="idx">
        <move-card :move="{
        ...r,
        frm: r['frm'],
        getOn: r['getOn'],
        getOff: r['getOff']
        }"/>
        <stop-card v-if="idx+1 < routeLen" :stop="{
        name: r['to'],
        arrive: r['getOff'],
        leave: data.route[idx+1]['getOn']
        }"/>
        <stop-card v-else :stop="{
        name: r['to'],
        arrive: r['getOff'],
        }"/>

      </div>
    </div>
  </div>
</template>

<script>

    import StopCard from '../components/StopCard';
    import MoveCard from '../components/MoveCard';

    export default {
        name: 'RouteDetail',
        components: {StopCard, MoveCard},
        data() {
            return {
                id: 0
            }
        },
        created() {
            this.id = parseInt(this.$route.params.id);
            console.log(this.data)
        },
        mounted() {
            console.log(typeof this.id);
            console.log(this.data)
        },
        computed: {
            routeLen() {
                return this.data.route.length;
            },
            data() {
                return this.$store.getters.getRouteById(this.id)[0];
            }
        },
        methods: {
            getHM(unitime) {
                const date = new Date(unitime);
                const hh = ('00' + date.getHours()).slice(-2);
                const mm = ('00' + date.getMinutes()).slice(-2);
                return `${hh}:${mm}`;
            },
            getSubTime(s, e) {
                const sub = e - s;
                return sub / 1000 / 60;
            }
        },
    }
</script>

<style lang="scss" scoped>
  .title-style {
    height: 50px;
    font-size: 32px;

    .min-font-style {
      font-size: 24px;
    }
  }
</style>

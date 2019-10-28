<template>
  <div class="route-list-style">
    <div v-if="routes.length > 0">
      <div style="margin: 10px;" v-for="(list,idx) in routes" :key="idx">
        <el-card :body-style="bodyStyle">
          <el-link @click="routerPush(list.id)" :underline="false">
            <div class="card-item-style">
              <div>
                <span class="time-font-style">{{getHM(list.startTime)}} - {{getHM(list.endTime)}}</span>
                <span class="between-style"></span>
                <span>({{getSubTime(list.startTime, list.endTime)}}分)
          </span>
              </div>
              <div class="middle-font-style">乗換 : {{list.transfer}}回<span class="between-style"></span>料金 :
                {{list.fare}}円
              </div>
              <div>
                <icon-start/>
                <span v-for="(r,jdx) in list.route" :key="jdx">
                <span v-if="r.way === '路線バス'">
                  {{r.from}} - <icon-buss/> - {{r.to}}
                </span>
                <span class="no-wrap-style" v-else>
                 - <icon-walking/> {{getSubTime(r["getOn"], r["getOff"])}}分 -
                </span>
              </span>
                <icon-goal/>
              </div>
            </div>
          </el-link>
        </el-card>
      </div>
    </div>
    <div v-else>経路が見つかりません</div>

    <div class="button-top-style">
      <router-link to="/">
        <el-button type="primary">検索画面に戻る</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>

    import IconWalking from '../components/IconWalking';
    import IconBuss from '../components/IconBuss';
    import IconGoal from '../components/IconFlag';
    import IconStart from '../components/IconStand';

    // 以下の処理にRouteListと重複してい流ので旧通過したほうがよさそう
    export default {
        name: 'RouteList',
        components: {IconBuss, IconWalking, IconGoal, IconStart},
        data() {
            return {
                // lists: routeLists.routes,
                bodyStyle: {
                    padding: "10px",
                }
            }
        },
        computed: {
            routes() {
                return this.$store.state.routes
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
            },
            routerPush(id) {
                this.$router.push('/detail/' + id);
            }
        }
    }
</script>

<style lang="scss" scoped>
  .route-list-style {
    height: 100%;
    text-align: center;

    .button-top-style {
      margin-top: 30px;
    }


    .card-item-style {
      .no-wrap-style {
        white-space: nowrap;
      }

      .time-font-style {
        font-size: 32px;
        font-weight: bold;
      }

      .between-style {
        padding-right: 10px;
      }

      .middle-font-style {
        font-size: 20px;
      }

    }

  }
</style>

<template>
  <div class="move-card-style">
    <div class="buss-style" v-if="move.way === 'buss'">
      <div>{{move.line}}</div>
      <div>
        {{move.fare}}円
        <span style="padding: 10px;"></span>
        <IconBuss/>
        {{move.past}}駅
      </div>
    </div>
    <div class="walk-style" v-else>
      <div>
        <icon-walking/>
        {{(move.getOff - move.getOn)/1000/60}}分
      </div>
    </div>
  </div>
</template>

<script>

    import IconWalking from '../components/IconWalking';
    import IconBuss from '../components/IconBuss';

    export default {
        name: 'MoveCard',
        components: {IconWalking, IconBuss},
        data() {
            return {
                move: {
                    way: "buss",
                    line: "会津バス 西若松駅東口",
                    frm: "北柳原",
                    to: "会津若松駅",
                    past: 2,
                    getOn: 1568258573586,
                    getOff: 1568258873586,
                    fare: 170
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  .move-card-style {
    height: 52px;
    width: 100%;
    display: flex;

    .buss-style {
      margin-left: 52px;
      border-left: solid 5px #ef9a9a;
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .walk-style {
      margin-left: 52px;
      border-left: dotted 5px rgba(0, 0, 0, 0.3);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>

<template>
  <el-form class="detail-search-style">
    <el-form-item>
      <span>{{form.money}}円以内</span>
      <el-slider class="slider-style" :max="30000" :show-tooltip="false" :step="1000" v-model="form.money"
                 :marks="moneyMarks"></el-slider>
    </el-form-item>
    <el-form-item>
      <span>{{form.time}}時間以内</span>
      <el-slider :max="12" v-model="form.time" :show-tooltip="false" :marks="timeMarks"></el-slider>
    </el-form-item>
    <!-- ここfor で回したほうがすっきりしそう -->
    <el-form-item>
      <label class="label-style">景色がいいところ優先</label>
      <el-switch v-model="form.isNiceView"></el-switch>
    </el-form-item>
    <el-form-item>
      <label class="label-style">乗り換え回数が多い</label>
      <el-switch v-model="form.isManyTransfer"></el-switch>
    </el-form-item>
    <el-form-item>
      <label class="label-style">待ち時間が長い</label>
      <el-switch v-model="form.isLongWait"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button @click="reset">リセット</el-button>
      <el-button type="primary" @click="onSubmit">設定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: 'DetailSearch',
        data() {
            return {
                form: {
                    isChanged: false,
                    money: 10000,
                    time: 5,
                    isNiceView: false,
                    isManyTransfer: false,
                    isLongWait: false
                },
                moneyMarks: {
                    10000: '1万円',
                    20000: '2万円',
                    30000: '3万円',
                },
                timeMarks: {
                    0: '0h',
                    12: '12h',
                    24: '24h'
                }
            }
        },
        methods: {
            onSubmit() {
                this.form.isChanged = true;
                this.$emit('change', this.form);
            },
            reset() {
                this.form = {
                    isChanged: false,
                    money: 10000,
                    time: 5,
                    isNiceView: false,
                    isManyTransfer: false,
                    isLongWait: false
                };
            }
        }
    }
</script>

<style lang="scss" scoped>
  .detail-search-style {
    padding: 10px 30px;

    .slider-style {
      /*width: 80%;*/
      white-space: nowrap;
    }

    .label-style {
      display: block;
      float: left;
      width: 200px;
    }
  }
</style>

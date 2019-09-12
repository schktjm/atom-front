<template>
  <div class="home">
    <el-form>
      <el-form-item>
        <el-input placeholder="出発地" v-model="form.start"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="目的地" v-model="form.end"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="button-style" @click="dialogTableVisible = true">{{timeText}}</el-button>
      </el-form-item>

      <el-form-item>
        <el-button class="button-style" type="primary">この条件で検索</el-button>
      </el-form-item>
      <el-dialog width="95%" :visible.sync="dialogTableVisible">
        <detailed-time @onCancel="onCancel" @onSubmit="setTimeText"/>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
    // @ is an alias to /src
    import DetailedTime from '../components/DetailedTime';

    export default {
        name: 'home',
        components: {DetailedTime},
        data() {
            return {
                dialogTableVisible: false,
                form: {
                    start: '',
                    end: '',
                },
                timeText: '現在時刻'
            }
        },
        methods: {
            onCancel() {
                this.closeDialog();
            },
            closeDialog() {
                this.dialogTableVisible = false;
            },
            parseYMD2ja(date) {
                const dow = ["日", "月", "火", "水", "木", "金", "土"];
                const y = date.getFullYear();
                const m = date.getMonth() + 1;
                const d = date.getDate();
                const dayOfW = date.getDay();
                return `${y}年${m}月${d}日 (${dow[dayOfW]})`;
            },
            parseTime(d) {
                return `${d.getHours()}:${d.getMinutes()}`
            },
            setTimeText(form) {
                console.log(form);
                if (form.isNow) {
                    this.timeText = '現在時刻'
                } else {
                    if (form.type === '1') {
                        this.timeText = `${this.parseYMD2ja(form.date)} 始発`
                    } else if (form.type === '2') {
                        this.timeText = `${this.parseYMD2ja(form.date)} 終電`
                    } else {
                        if (form.method === '0') {
                            this.timeText = `${this.parseYMD2ja(form.date)} ${this.parseTime(form.time)} 出発`
                        } else {
                            this.timeText = `${this.parseYMD2ja(form.date)} ${this.parseTime(form.time)} 到着`
                        }
                    }
                }
                this.closeDialog();
            }
        }
    }
</script>

<style lang="scss" scoped>
  .home {
    .button-style {
      width: 100%;
    }
  }

</style>

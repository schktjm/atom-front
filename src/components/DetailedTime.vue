<template>
  <el-form class="detailed-time-style">
    <el-form-item>
      <div class="select-method-style">
        <el-button class="text-button-style" type="text" @click="setInit">現在時刻</el-button>
        <el-radio-group class="method-style" v-model="form.method" size="mini">
        <!-- ここをlabelとtextをセットにして、オブジェクトにして、forで回したほうがすっきりしそう -->
          <el-radio-button label="0">出発</el-radio-button>
          <el-radio-button label="1">到着</el-radio-button>
        </el-radio-group>
      </div>
    </el-form-item>
    <el-form-item>
      <div class="time-date-box">
        <el-date-picker
            class="date-picker-style"
            v-model="form.date"
            type="date"
            size="medium"
            placeholder="Pick a day"
            @change="setTime"
        ></el-date-picker>
        <el-time-picker
            v-model="form.time"
            placeholder="Pick a time"
            size="medium"
            @change="setTime"
        ></el-time-picker>
      </div>
    </el-form-item>
    <el-form-item>
      <el-radio-group class="radio-group-style" @change="setTime" v-model="form.type" size="small">
        <!-- ここをlabelとtextをセットにして、オブジェクトにして、forで回したほうがすっきりしそう -->
        <el-radio-button class="radio-item" label="1">始発</el-radio-button>
        <el-radio-button class="radio-item" label="2">終電</el-radio-button>
        <el-radio-button class="radio-item" label="0">指定なし</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <div class="submit-buttons-style">
        <el-button size="medium" @click="handleCancel">キャンセル</el-button>
        <el-button type="primary" size="medium" @click="onSubmit">完了</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "DetailedTime",
        mounted() {
            this.form.date = new Date();
            this.form.time = new Date();
        },
        data() {
            return {
              // コメントで書いてあるのいいね
              //　methodとtypeはenumで定義してあるともっとよさそう
                form: {
                    // 0:出発, 1:到着
                    method: "0",
                    // 0:していなし 1: 始発, 2: 終電,
                    type: "0",
                    // yyyy-mm-dd
                    date: "",
                    // Date()
                    time: "",
                    isNow: true
                }
            };
        },
        methods: {
            getYMD(date) {
                // 個々の処理はHome.vueに書いたように関数を用意して、そこから引っ張ってくるとよさそう
                const y = date.getFullYear();
                const m = date.getMonth() + 1;
                const d = date.getDate();
                return `${y}-${m}-${d}`;
            },
            setInit() {
                this.form.date = new Date();
                this.form.time = new Date();
                this.form.isNow = true;
            },
            setTime() {
                this.form.isNow = false;
            },
            setTimeNone() {
                this.form.time = ''
            },
            handleCancel() {
                this.setInit();
                this.$emit('onCancel')
            },
            onSubmit() {
                this.$emit('onSubmit', this.form)
            }
        }
    };
</script>

<style lang="scss" scoped>
  .detailed-time-style {
    width: 100%;

    > *:nth-child(n+2) {
      margin-top: 5px;
    }

    .select-method-style {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text-button-style {
        width: calc(100% / 3);
      }

      .method-style {
        width: calc(200% / 3);

        label {
          width: 50%;

          /deep/ span {
            // importantを使うかどうかは結構吟味したほうがよさそう
            width: 100% !important;
          }
        }

      }
    }

    .time-date-box {
      display: flex;
      justify-content: space-between;

      .date-picker-style {
        margin-right: 10px;
      }
    }

    .radio-group-style {
      width: 100%;

      .radio-item {
        width: calc(100% / 3);

        /deep/ span {
          width: 100% !important;
        }
      }
    }

    .submit-buttons-style {
      display: flex;
      justify-content: space-between;

      button {
        width: 120px;
      }
    ;
    }
  }
</style>

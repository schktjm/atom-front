<template>
  <div class="home">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="start" class="one-line-style">
        <el-input placeholder="出発地" v-model="ruleForm.start" @change="changeStart" class="input-style"></el-input>
        <el-button icon="el-icon-aim" circle @click="setHere" :disabled="!canUseGeo"></el-button>
      </el-form-item>
      <el-form-item prop="end">
        <el-input placeholder="目的地" v-model="ruleForm.end"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="button-style" @click="dialogTableVisible = true">{{timeText}}</el-button>
      </el-form-item>
      <!--      <div class="text-box-style" v-if="detailSearchForm.isChanged">-->
      <!--        <div><span class="marker-style">{{detailSearchForm.money}}円以内で</span></div>-->
      <!--        <div><span class="marker-style">{{detailSearchForm.time}}時間以内で</span></div>-->
      <!--        <div><span class="marker-style" v-if="detailSearchForm.isNiceView">景色の綺麗なところ優先で</span></div>-->
      <!--        <div><span class="marker-style" v-if="detailSearchForm.isManyTransfer">乗り換え回数が多くで</span></div>-->
      <!--        <div><span class="marker-style" v-if="detailSearchForm.isLongWait">待ち時間がながくで</span></div>-->
      <!--        <div>検索する！</div>-->
      <!--      </div>-->
      <el-form-item class="checkbox-p-style">
        <el-checkbox v-model="isOnlyLocal" class="checkbox-style" disabled>路線バスのみで検索する！</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="button-style" type="primary" :loading="isLoading" @click="submitForm('ruleForm')">この条件で検索
        </el-button>
      </el-form-item>
      <el-dialog width="95%" :visible.sync="dialogTableVisible">
        <detailed-time @onCancel="onCancel" @onSubmit="setTimeText"/>
      </el-dialog>


      <!--      <el-button class="button-style" @click="drawer = true" type="primary" plain>-->
      <!--        もっと詳細検索-->
      <!--      </el-button>-->

      <el-drawer
          title="詳細検索"
          :visible.sync="drawer"
          direction="btt"
          size="70%"
      >
        <span>
          <detail-search @change="setDetailSearch"></detail-search>
        </span>
      </el-drawer>

    </el-form>
  </div>
</template>

<script>
    // @ is an alias to /src
    import DetailedTime from '../components/DetailedTime';
    import DetailSearch from '../components/DetailSearch';

    export default {
        name: 'home',
        components: {DetailedTime, DetailSearch},
        data() {
            return {
                isOnlyLocal: true,
                canUseGeo: true,
                isHere: false,
                geolocation: {
                    lat: 0,
                    lng: 0,
                },
                isLoading: false,
                dialogTableVisible: false,
                ruleForm: {
                    start: '',
                    end: '',
                    date: 1569409197,
                    useDateAs: 1
                },
                rules: {
                    start: [{required: true, message: '出発地を入力してください', trigger: 'blur'}],
                    end: [{required: true, message: '目的地を入力してください', trigger: 'blur'}],
                },
                timeText: '現在時刻 出発',
                drawer: false,
                detailSearchForm: {
                    isChanged: false,
                    money: 10000,
                    time: 5,
                    isNiceView: false,
                    isManyTransfer: false,
                    isLongWait: false
                }
            }
        },
        created() {
            this.ruleForm.date = Math.floor(new Date().getTime() / 1000);
            this.canUseGeo = "geolocation" in navigator;
        },
        methods: {
            setHere() {
                this.isHere = true;
                this.ruleForm.start = `現在位置`;
                this.getGeoLocation();
            },
            changeStart() {
                this.isHere = false;
            },
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
                    this.timeText = '現在時刻 出発';
                    this.ruleForm.date = Math.floor(new Date().getTime() / 1000);
                    this.ruleForm.useDateAs = 1;
                } else {
                    let dateArr = form.date.toString().split(" ");
                    dateArr[4] = form.time.toString().split(" ")[4];
                    const newDate = new Date(dateArr.join(" ")).getTime();
                    this.ruleForm.date = Math.floor(newDate / 1000);
                    if (form.type === '1') {
                        this.timeText = `${this.parseYMD2ja(form.date)} 始発`;
                        this.ruleForm.useDateAs = 3;
                    } else if (form.type === '2') {
                        this.timeText = `${this.parseYMD2ja(form.date)} 終電`;
                        this.ruleForm.useDateAs = 4;
                    } else {
                        if (form.method === '0') {
                            this.timeText = `${this.parseYMD2ja(form.date)} ${this.parseTime(form.time)} 出発`;
                            this.ruleForm.useDateAs = 1;
                        } else {
                            this.timeText = `${this.parseYMD2ja(form.date)} ${this.parseTime(form.time)} 到着`;
                            this.ruleForm.useDateAs = 2;
                        }
                    }
                }
                this.closeDialog();
            },
            setDetailSearch(form) {
                this.detailSearchForm = {...form};
                this.drawer = false;
            },
            getGeoLocation() {
                navigator.geolocation.getCurrentPosition(pos => {
                    this.geolocation.lat = pos.coords.latitude;
                    this.geolocation.lng = pos.coords.longitude;
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isLoading = true;
                        if (this.isHere) {
                            this.$store.dispatch('getRoutesByGeo', {
                                "fromLat": String(this.geolocation.lat),
                                "fromLng": String(this.geolocation.lng),
                                "to": this.ruleForm.end,
                                "date": String(this.ruleForm.date),
                                "useDateAs": this.ruleForm.useDateAs
                            })
                                .then(flg => {
                                    this.isLoading = false;
                                    if (flg) this.$router.push("/list");
                                })
                        } else {
                            this.$store.dispatch('getRoutes', {
                                "from": this.ruleForm.start,
                                "to": this.ruleForm.end,
                                "date": String(this.ruleForm.date),
                                "useDateAs": this.ruleForm.useDateAs
                            })
                                .then(flg => {
                                    this.isLoading = false;
                                    if (flg) this.$router.push("/list");
                                })

                        }
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
  .home {
    .button-style {
      width: 100%;
    }

    .one-line-style {
      width: 100%;

      .input-style {
        width: 80%;
        margin-right: 15px;
      }
    }

    .checkbox-p-style {
      display: flex;
      justify-content: center;
    }

    .text-box-style {
      /*width: 200px;*/
      padding: 10px 20px;

      .marker-style {
        background: linear-gradient(transparent 60%, rgba(244, 67, 54, 0.3) 0%);
        font-size: 24px;
        white-space: nowrap;
      }

    }
  }

</style>

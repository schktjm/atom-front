<template>
  <div style="height: 300px;">
    <div>{{data}}</div>
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        aizu wakamatsu station
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2019/9/12">aaa</el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>

    import data from '../assets/json/routeDetail';

    export default {
        name: 'RouteDetail',
        data() {
            return {
                data: data
            }
        }
    }
</script>

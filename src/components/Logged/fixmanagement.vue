<template>
  <br>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>已预约信息</span>
      </div>
    </template>
    <div class="block">
      <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
      >
      </el-date-picker>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "fixmanagement",
  data() {
    return {
      shortcuts: [{
        text: '最近一周',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        })(),
      }, {
        text: '最近一个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        })(),
      }, {
        text: '最近三个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        })(),
      }],
      value2: ''
    }
  },
  watch:{
    'value2':{
      handler: function(val,oldVal) {
        console.log(val,oldVal)
      },
      deep: true
    }
  },
}
</script>

<style scoped>
.box-card {
  width: 90%;
  margin: 0 auto;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
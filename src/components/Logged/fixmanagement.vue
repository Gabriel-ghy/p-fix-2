<template>
  <br>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>已预约信息</span>
      </div>
    </template>
    <div class="block">
      <p align="left">条件查询：</p>
      <el-date-picker
          v-model="DateRange"
          type="daterange"
          align="left"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
          style="width: 80%"
      >
      </el-date-picker>
      <br><br>
      <el-radio-group v-model="status">
      <el-radio-button label="0">未维修</el-radio-button>
      <el-radio-button label="1">未修好</el-radio-button>
      <el-radio-button label="2">已修好</el-radio-button>
      <el-radio-button label="3">所有</el-radio-button>
      </el-radio-group>&nbsp; &nbsp;
      <el-radio-group v-model="schoolid">
        <el-radio-button label="1">南湖校区</el-radio-button>
        <el-radio-button label="2">浑南校区</el-radio-button>
        <el-radio-button label="3">所有</el-radio-button>
      </el-radio-group>
      <br><br>
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" :default-sort = "{prop: 'fixtime', order: 'descending'}">
        <el-table-column prop="id" label="编号" width="80" sortable></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="fixdate" label="维修时间" sortable></el-table-column>
        <el-table-column v-if="status==='3'" prop="status" label="状态" width="80" sortable>
          <template v-slot="scope">
            <p v-if="scope.row.status===0">未维修</p>
            <p v-if="scope.row.status===1">未修好</p>
            <p v-if="scope.row.status===2">已修好</p>
          </template>
        </el-table-column>
        <el-table-column v-if="schoolid==='3'" prop="schoolid" label="校区" width="80" sortable>
          <template v-slot="scope">
            <p v-if="scope.row.schoolid===1">南湖校区</p>
            <p v-if="scope.row.schoolid===2">浑南校区</p>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template v-slot="scope"><el-button @click="showDetail(scope.row)">查看详情</el-button></template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="维修预约详情" v-model="detailVisible" width="80%">
      <el-descriptions border>
        <el-descriptions-item><template #label>编号</template>{{detailData.id}}</el-descriptions-item>
        <el-descriptions-item><template #label>姓名</template>{{ detailData.name }}</el-descriptions-item>
        <el-descriptions-item><template #label>电话</template>{{ detailData.phone }}</el-descriptions-item>
        <el-descriptions-item><template #label>QQ</template>{{ detailData.qq }}</el-descriptions-item>
        <el-descriptions-item v-if="detailData.schoolid===1"><template #label>校区</template>南湖校区</el-descriptions-item>
        <el-descriptions-item v-if="detailData.schoolid===2"><template #label>校区</template>浑南校区</el-descriptions-item>
        <el-descriptions-item><template #label>预约时间</template>{{ detailData.fixdate }}</el-descriptions-item>
        <el-descriptions-item><template #label>电脑型号</template>{{ detailData.model }}</el-descriptions-item>
        <el-descriptions-item><template #label>问题</template>{{ detailData.problemid }}</el-descriptions-item>
        <el-descriptions-item v-if="detailData.status===0"><template #label>维修状态</template>未维修</el-descriptions-item>
        <el-descriptions-item v-if="detailData.status===1"><template #label>维修状态</template>未修好</el-descriptions-item>
        <el-descriptions-item v-if="detailData.status===2"><template #label>维修状态</template>已修好</el-descriptions-item>
        <el-descriptions-item><template #label>填写时间</template>{{ detailData.appointmenttime }}</el-descriptions-item>
        <el-descriptions-item><template #label>问题描述</template>{{ detailData.description }}</el-descriptions-item>
      </el-descriptions>
      <br><br>
      <el-popover placement="bottom-end" :width="400" trigger="click">
        <template #reference>
          <el-button>添加维修记录</el-button>
        </template>
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="note"></el-input>
        <br>
        <p>更改维修状态：
          <el-radio v-model="radio" label='1'>未修好</el-radio>
          <el-radio v-model="radio" label='2'>已修好</el-radio>
        </p>
        <el-button @click="addNote()" style="float:right;">确认</el-button>
      </el-popover>&nbsp;&nbsp;&nbsp;&nbsp;
<!--      <br>-->
<!--      <h3>添加维修记录</h3>-->
<!--      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="note"></el-input>-->
<!--      <br><br>-->
<!--      <p>更改维修状态：-->
<!--        <el-radio v-model="radio" label='1'>未修好</el-radio>-->
<!--        <el-radio v-model="radio" label='2'>已修好</el-radio>-->
<!--        <el-button @click="addNote()" style="float:right;">确认</el-button>-->
<!--      </p>-->
      <el-popover placement="bottom-start" :width="700" trigger="click">
        <template #reference>
          <el-button>已有维修记录</el-button>
        </template>
        <el-table :data="recordData" stripe style="width: 100%">
          <el-table-column prop="fixuserid" label="记录者" width="180"></el-table-column>
          <el-table-column prop="notetime" label="记录时间" width="180"></el-table-column>
          <el-table-column prop="note" label="内容"></el-table-column>
        </el-table>
      </el-popover>
<!--      <h3>已有维修记录</h3>-->
<!--      <el-table :data="recordData" stripe style="width: 100%">-->
<!--        <el-table-column prop="fixuserid" label="记录者" width="180"></el-table-column>-->
<!--        <el-table-column prop="notetime" label="记录时间" width="180"></el-table-column>-->
<!--        <el-table-column prop="note" label="内容"></el-table-column>-->
<!--      </el-table>-->
    </el-dialog>
  </el-card>
</template>

<script>
import axios from "axios";

export default {
  name: "fixmanagement",
  data() {
    return {
      shortcuts: [{
        text: '前一周',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        })(),
      },{
        text: '后一周',
        value: (() => {
          const end = new Date()
          const start = new Date()
          end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
          return [start, end]
        })(),
      },{
        text: '后两周',
        value: (() => {
          const end = new Date()
          const start = new Date()
          end.setTime(end.getTime() + 3600 * 1000 * 24 * 7 * 2)
          return [start, end]
        })(),
      },{
        text: '前一个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        })(),
      }, {
        text: '前三个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        })(),
      }],
      DateRange: '',
      status:'3',
      schoolid:'3',
      tableData:'',
      detailVisible:false,
      detailData:'',
      problem:'',
      recordData:[
          {
            fixuserid:'null',
            notetime:'null',
            note:'null'
          }
      ],
      note:'',
      radio:'1',
    }
  },
  watch: {
    'DateRange': {
      handler: function (val, oldVal) {
        console.log(val, oldVal)
        this.search();
      },
      deep: true
    },
    'status':{
      handler:function (val,oldVal)
      {
        console.log(val,oldVal)
        this.search();
        console.log(this.tableData)
      }
    },
    'schoolid':{
      handler:function (val,oldVal)
      {
        console.log(val,oldVal)
        this.search();
        console.log(this.tableData)
      }
    }
  },
  methods:{
    search() {
      var fixdate1=''
      var fixdate2=''
      if (this.DateRange !== "")
      {
        //TODO:点击×号后会卡死报错
        fixdate1=this.DateRange[0].getFullYear()+"-"+(this.DateRange[0].getMonth()+1)+"-"+this.DateRange[0].getDate()
        fixdate2=this.DateRange[1].getFullYear()+"-"+(this.DateRange[1].getMonth()+1)+"-"+this.DateRange[1].getDate()
      }
      else
      {
        fixdate1="0000-00-00"
        fixdate2="9999-12-31"
      }
      axios.post("/api/GetAppointments",{
        "fixdate1":fixdate1,
        "fixdate2":fixdate2,
        "status":this.status,
        "schoolid":this.schoolid
          }
      ).then(r => {
        this.tableData=r.data
      }).catch(error => {
        console.log(error)
      })
    },
    'tableRowClassName':function (row) {
      if (row.row.status === 1 || row.row.status ===0) {
        return 'warning-row';
      } else if (row.row.status === 2) {
        return 'success-row';
      }
      return '';
    },
    showDetail(row){
      console.log(row);
      this.detailVisible = true;
      this.detailData = row;
      axios.get("/api/GetNotesByAppId?appointmentid=" + row.id).then(r => {
        console.log(r.data);
        this.recordData = r.data;
      }).catch(error => {
        console.log(error)
      })
    },
    addNote(){
      console.log(localStorage.getItem('userid'))
      axios.post("/api/AddNotes",{
        'appointmentid':this.detailData.id,
        'fixuserid': localStorage.getItem('userid'),
        'note':this.note
      }).then(r => {
        console.log(r.data)
      }).catch(error => {
        console.log(error)
      })
      this.note = '';
      this.$message({type: 'success', message: '添加成功!'});
      axios.get("/api/GetNotesByAppId?appointmentid=" + this.detailData.id).then(r => {
        console.log(r.data);
        this.recordData = r.data;
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.search();

  }
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
.el-table>>>.warning-row {
   background: oldlace;
 }

.el-table>>>.success-row {
  background: #f0f9eb;
}
</style>

<template>
  <!--  <el-empty description="这里是预约界面～"></el-empty>-->
  <br>
  <el-card class="box-card">
    <template #header>
    <div class="card-header">
      <span>请填写你的预约信息哦～</span>
    </div>
      </template>
    <el-form label-position="left" :model="appointmentForm" :rules="rules" label-width="100px" class="demo-ruleForm" ref="appointmentForm">
      <el-form-item label="姓名" prop="name" style="width: auto">
        <el-input v-model="appointmentForm.name"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" style="width: auto">
        <el-input v-model="appointmentForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="QQ" style="width: auto">
        <el-input v-model="appointmentForm.QQ"></el-input>
      </el-form-item>
      <el-form-item label="校区" prop="schoolid" >
        <el-select v-model="appointmentForm.schoolid" placeholder="请选择校区" style="width: 100%">
          <el-option label="南湖校区" value="1"></el-option>
          <el-option label="浑南校区" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期" prop="fixdate" v-if="appointmentForm.schoolid!==''">
        <el-date-picker v-model="appointmentForm.fixdate" type="date" placeholder="选择日期" style="width: 100%" :disabled-date="disabledDate">
        </el-date-picker>
      </el-form-item>
      <p id="information" v-if="fixdate!==''"></p>
      <el-form-item label="&nbsp;&nbsp;电脑型号" prop="model" style="width: auto">
        <el-input v-model="appointmentForm.model" placeholder="不清楚可不填"></el-input>
      </el-form-item>
      <el-form-item label="电脑问题" prop="problemid" >
        <el-select v-model="appointmentForm.problemid" placeholder="请选择电脑出现的问题" style="width: 100%">
          <el-option label="开不了机" value="1"></el-option>
          <el-option label="清灰" value="2"></el-option>
          <el-option label="重装系统" value="3"></el-option>
          <el-option label="更换硅脂" value="4"></el-option>
          <el-option label="更换硬件" value="5"></el-option>
          <el-option label="其他" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="&nbsp;&nbsp;问题描述" prop="description" >
      <el-input type="textarea" :rows="2" placeholder="详细的描述有利于我们做好准备哦" v-model="appointmentForm.description"></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-button type="primary" @click="submitForm('appointmentForm')">提交</el-button>
        <el-button @click="resetForm('appointmentForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>

import {ElMessage} from "element-plus";
import axios from "axios";

export default {
  name: "appointment",
  data() {
    let this_ = this
    return {
      centerDialogVisible:false,
      appointmentForm: {
        name: '',
        // fixtimeid: '',
        fixdate:'',
        phone:'',
        QQ:'',
        schoolid:'',
        model:'',
        problemid:'',
        description:''
      },
      fixtimedata:'',
      rules: {
        name: [
          {required: true, message: '请输入您的姓名', trigger: 'blur'},
          {min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        fixdate: [
          {required: true, message: '请选择时间', trigger: 'change'}
        ],
        schoolid: [
          {required: true, message: '请选择校区', trigger: 'change'}
        ],
        problemid: [
          {required: true, message: '请选择电脑出现的问题', trigger: 'change'}
        ],
        phone: [
          {required: true, message: '请输入您的电话', trigger: 'blur'},
          {min: 11, max: 11, message: '长度为 11 个字符', trigger: 'blur'}
        ],
        QQ: [
          {required: true, message: '请输入您的QQ', trigger: 'blur'},
          {min: 6, max: 10, message: '长度在 8 到 10 个字符', trigger: 'blur'}
        ]
      },
      disabledDate(time) {
        if(time.getTime()>Date.now())
        {
          if(this_.appointmentForm.schoolid==="1")
          { //南湖校区
            console.log("111")
            return !(time.getDay() === 1 || time.getDay() === 2 || time.getDay() === 4);
          }
          else if(this_.appointmentForm.schoolid==="2")
          {
            return !(time.getDay() === 0 || time.getDay() === 3);
          }
          // TODO: 这块依赖于前端的计算了，不便于修改维修日期，需要优化
        }
        else return true
      }
    }
  },
  methods:{
    submit(){
      console.log(this.appointmentForm);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("/api/Appointment",{
            'name': this.appointmentForm.name,
            'phone':this.appointmentForm.phone,
            'qq':this.appointmentForm.QQ,
            'schoolid':this.appointmentForm.schoolid,
            'model':this.appointmentForm.model,
            'problemid':this.appointmentForm.problemid,
            'fixdate':this.appointmentForm.fixdate,
            'description':this.appointmentForm.description
          }).then(r => {
            console.log(r.data)
          }).catch(error => {
            console.log(error)
          })
          ElMessage('提交成功！')
          this.resetForm('appointmentForm')
        } else {
          ElMessage('请按要求填写信息哦～')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch:{
    'appointmentForm.schoolid':{
      handler: function(newval,oldVal) {
        console.log(newval,oldVal)
        if(newval!=='')
        {
            this.appointmentForm.fixdate = ''
        }
      },
      deep: true
    },
    'appointmentForm.fixdate':{
      handler: function(newval,oldVal) {
        console.log(newval,oldVal)
        // let this_ = this
        if(newval!=='')
          document.getElementById("information").innerHTML = "您的时间和地点是："+this.appointmentForm.fixdate.getFullYear()+"年"+(this.appointmentForm.fixdate.getMonth()+1)+"月"+this.appointmentForm.fixdate.getDate()+"日 "+this.fixtimedata.filter(function (_data){
            return _data.weekdayid===newval.getDay()
          })[0]["fixtimestring"]
      }
    }
  },
  mounted() {
    axios.get("/api/GetFixTimes").then(r => { //获取维修时间信息
      this.fixtimedata = r.data
    }).catch(error => {
      console.log(error)
    })
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
</style>
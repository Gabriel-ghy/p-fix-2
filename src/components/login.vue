<template>
  <br>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>先锋网络中心维修预约系统登录</span>
      </div>
    </template>
    <el-form ref="form">
      <el-form-item label="用户名 目前唯一用户名：yan 密码:1001">
        <el-input v-model="LoginForm.userid"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" v-model="LoginForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="LoginForm.inputImageCode" auto-complete="off" class="el-col-width"></el-input>
      </el-form-item>
      <el-form-item>
        <img id="img" alt="验证码" onclick="this.src='/api/CreateImageCode?d='+new Date()*1" src="/api/CreateImageCode"/>
      </el-form-item>
      <el-form-item center>
        <el-button type="primary" @click="handleSubmit">登录</el-button>
        <el-button>注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {mapMutations} from 'vuex';
import axios from 'axios'
import {ElMessage} from 'element-plus'
import store from "@/store/main";

export default {
  data() {
    return {
      LoginForm: {
        userid: '',
        password: '',
        inputImageCode: ''
      }
    };
  },

  methods: {
    ...mapMutations(['setToken']),
    // login() {  //已经弃用，下边的handleSubmit代替
    //   console.log(this.LoginForm);
    //   if (this.LoginForm.username === '' || this.LoginForm.password === '') {
    //     ElMessage('用户名或密码为空！');
    //   } else if (store.state.token) {
    //     ElMessage('您已登录！')
    //     this.$router.replace('/')
    //   } else {
    //     axios.post('/api/Login', {
    //       "username": this.LoginForm.username,
    //       "password": this.LoginForm.password
    //     }).then(res => {
    //       console.log(res.data);
    //       if (res.data.code === 1) {
    //         this.setToken({token: res.data.token});    //store中的为token赋值方法
    //         this.$router.push('/');
    //       }
    //       ElMessage('登录成功！')
    //       this.$router.replace('/')
    //     }).catch(error => {
    //       ElMessage('账号或密码错误！')
    //       console.log(error);
    //     });
    //   }
    // },
    handleSubmit() {
      if (this.LoginForm.userid === '' || this.LoginForm.password === '' || this.LoginForm.inputImageCode === '') {
        ElMessage('用户名或密码或验证码为空！');
      } else if (store.state.token) {
        ElMessage('您已登录！')
        this.$router.replace('/')
      } else {
        axios.get('/api/CheckImageCode?inputImageCode=' + this.LoginForm.inputImageCode).then(r => {
          //先校验输入的验证码
          if (r.data.code === '200') {
            console.log(r.data.code)
            axios.post('/api/Login', {
              "userid": this.LoginForm.userid,
              "password": this.LoginForm.password
            }).then(res => {
              console.log(res.data.token);
              if (res.data.code === 1) {
                this.setToken({token: res.data.token});    //store中的为token赋值方法
                ElMessage('登录成功！')
                this.$router.push('/');
              } else if (res.data.code === 0) {
                ElMessage("用户名或密码错误！")
                document.getElementById("img").src = '/api/CreateImageCode?d=' + new Date() * 1; //这里的图片是更换后的图片
                this.LoginForm.inputImageCode = ''
                this.LoginForm.password = ''
              }
            }).catch(error => {
              ElMessage('发生其他错误！')
              document.getElementById("img").src = '/api/CreateImageCode?d=' + new Date() * 1; //这里的图片是更换后的图片
              this.LoginForm.inputImageCode = ''
              this.LoginForm.password = ''
              console.log(error);
            });

          } else {
            document.getElementById("img").src = '/api/CreateImageCode?d=' + new Date() * 1; //这里的图片是更换后的图片
            ElMessage("验证码错误！")
            this.LoginForm.inputImageCode = ''
            this.LoginForm.password = ''
          }
        }).catch(error2 => {
          ElMessage("请重试！")
          document.getElementById("img").src = '/api/CreateImageCode?d=' + new Date() * 1; //这里的图片是更换后的图片
          console.log(error2)
        })
      }
    }

  }
};
</script>

<style>
.box-card {
  width: 80%;
  margin: 0 auto;
}

.button {
  margin: 0 auto;
}
</style>
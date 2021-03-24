<template>
  <br>
  <el-card class="box-card" >
    <el-form ref="form">
      <el-form-item label="用户名">
        <el-input v-model="LoginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" v-model="LoginForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item center>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button>注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-dialog title="提示" v-model="centerDialogVisible" width="30%" center>
    <span>用户名或密码为空，不可以哦</span>
    <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="centerDialogVisible = false" round>确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
import {mapMutations} from 'vuex';
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      LoginForm: {
        username: '',
        password: ''
      },
      centerDialogVisible: false
    };
  },

  methods: {
    ...mapMutations(['setToken']),
    login() {
      // let _this = this;
      console.log(this.LoginForm);
      if (this.LoginForm.username === '' || this.LoginForm.password === '') {
        this.centerDialogVisible = true;
      } else {
        axios.post('/api/Login', {"username":this.LoginForm.username,"password":this.LoginForm.password}).then(res => {
          console.log(res.data);
          if(res.data.code===1)
          {
            this.setToken({token: res.data.token});    //store中的为token赋值方法
            this.$router.push('/');
          }
          ElMessage('登录成功！')
          this.$router.replace('/')
        }).catch(error => {
          ElMessage('账号或密码错误！')
          console.log(error);
        });
      }
    }
  }
};
</script>

<style>
.box-card {
  width: 80%;
  margin:0 auto;
}
.button{
  margin:0 auto;
}
</style>
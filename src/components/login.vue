<template>
  <br>
  <el-card class="box-card" >
    <el-form ref="form">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
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

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      centerDialogVisible: false
    };
  },

  methods: {
    ...mapMutations(['changeLogin']),
    login() {
      let _this = this;
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        _this.centerDialogVisible = true;
      } else {
        axios.get('/Test',_this.loginForm).then(res => {
          console.log(res.data);
          // _this.userToken = 'Bearer ' + res.data.data.body.token;
          // // 将用户token保存到vuex中
          // _this.changeLogin({Authorization: _this.userToken});
          // _this.$router.push('/home');
          alert('登陆成功');
        }).catch(error => {
          alert('账号或密码错误');
          console.log(error);
        });
      }
    }
  }
};
</script>

<style>
.box-card {
  width: 500px;
  margin:0 auto;
}
.button{
  margin:0 auto;
}
</style>
<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1"><router-link to="/Appointment" style="text-decoration:none">预约维修</router-link></el-menu-item>
    <el-menu-item index="4"><router-link to="/FixManagement" style="text-decoration:none">维修管理</router-link></el-menu-item>
    <el-menu-item index="2"><router-link to="/" style="text-decoration:none">返回主页</router-link></el-menu-item>
    <el-menu-item index="3" @click="logout">退出登录</el-menu-item>
  </el-menu>
  <router-view />
</template>

<script>
  import {mapMutations} from "vuex"
export default {
  name: "Home",
  data(){
    return {

    }
  },
  methods:{
    ...mapMutations(['delToken']),
    logout(){
      this.delToken();
      this.$router.push('/Login');
    }
  },
}
</script>

<style scoped>

</style>
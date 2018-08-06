<template>
  <header>
    <h2><router-link :to="{path: '/'}"> 第 26 屆學生會官方網站 </router-link></h2>
    <ul class="custom-ul-style">
      <li><a href="#"> 關於學生會 </a></li>
      <li><a href="#"> 文章總覽 </a></li>
      <li><a href="#"> 公共政策參與平台 </a></li>
      <li><a href="#"> 聯絡我們 </a></li>
    </ul>
    <ul class="custom-ul-style float-right">
      <li>
        <router-link :to="{path: '/account/login'}" v-if="!this.$store.state.status"> 登入 </router-link> 
        <label v-if="this.$store.state.status"> Hello, <a href="#"> {{this.$store.state.authUser}} </a>  !!</label>
      </li>
      <li><a v-if="this.$store.state.status" href="#" v-on:click="logout"> 登出 </a> </li>
      <li><a href="#"> 臉書 </a></li>
      <li><a href="#"> IG </a></li>
    </ul>
  </header>
</template>

<script>
  export default {
    name: 'custom-header',
    methods: {
      logout: async function () {
        await this.$store.dispatch('logout')
      }
    }
  }
</script>

<style scoped>
  h2 {
    display: inline;
  }
  ul {
    display: inline;
  }
  ul.custom-ul-style {
    padding: 10px 16px;
    list-style-type: none;
  }
  ul.custom-ul-style li {
    display: inline;
  }
  ul.custom-ul-style li+li:before {
    padding: 8px;
    color: black;
    content: "/\00a0";
  }
  ul.custom-ul-style li a {
    color: #0275d8;
    text-decoration: none;
  }
  ul.custom-ul-style li a:hover {
    color: #01447e;
    text-decoration: underline;
  }

  .float-right {
    float: right;
  }
</style>

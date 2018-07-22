<template>
  <div>
    <h1> Registry 註冊</h1>  
    <label> 帳號 username </label><input type="text" id="username"/> <br/>
    <label> 密碼 password </label><input type="password" id="pwd"/> <br/>
    <label> 確認密碼 check password </label><input type="password" id="checkpwd"> <br/>
    <label> 姓名 name </label><input type="text" id="name"/> <br/>
    <button type="button" v-on:click="registry"> 註冊 Registry </button>
    <button type="button"> 取消 Cancel </button>
  </div>
</template>

<script>
  export default {
    methods: {
      registry: function () {
        const pwd = document.getElementById('pwd')
        const checkpwd = document.getElementById('checkpwd')
        if (pwd.value === checkpwd.value) {
          console.log('equal!!')
          // registry code here
        }
      }
    }
  }
</script>

<style>

</style>


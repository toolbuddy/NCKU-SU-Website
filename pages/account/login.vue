<template>
  <div>
    <h3> Login 登入 </h3>
    <form class="custom-form-style" method="get">
      <label> 帳號 username </label><input type="text" name="username"/>
      <br/>
      <label> 密碼 password </label><input type="password" name="pwd"/>
      <br/>
      <button type="submit"> 登入 Login </button>
    </form>
  </div>
</template>

<script>
  import axios from '~/plugins/axios';
  export default {
    methods: {
      submit: function () {
        // login code here...
      }
    }
  }
</script>

<style scoped>
  form.custom-form.style {
    margin: 0px auto;
    text-align: center;
  }
</style>

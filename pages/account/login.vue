<template>
  <div>
    <h3> Login 登入 </h3>
    <form class="custom-form-style" method="post">
      <label> 帳號 username </label><input type="text" id="username"/>
      <br/>
      <label> 密碼 password </label><input type="password" id="pwd"/>
      <br/>
      <button type="button" v-on:click="submit"> 登入 Login </button>
    </form>
  </div>
</template>

<script>
  export default {
    methods: {
      submit: async function () {
        // login code here...
        const params = {
          username: document.getElementById('username').value,
          password: document.getElementById('pwd').value
        }
        await this.$store.dispatch('login', params)
        this.$router.push({path: '../'})
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

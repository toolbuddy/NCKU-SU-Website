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
    <router-link v-bind:to="{path: '/account/forget'}"> 忘記密碼？ </router-link>
  </div>
</template>

<script>
  export default {
    methods: {
      submit: async function () {
        const user = document.getElementById('username').value
        const pwd = document.getElementById('pwd').value
        // check password value validation.
        if (!this.valValidation(pwd)) {
          console.log('value format error')
          // TODO: error action.
          return
        }
        // check password length validation
        if (!this.lengthValidation(pwd)) {
          console.log('length error')
          // TODO: error action.
          return
        }
        // login code here...
        const params = {
          username: user,
          password: pwd
        }
        await this.$store.dispatch('login', params)
        this.$router.push('../')
      },
      valValidation: function (str) {
        const regExp = /^[\d|a-zA-Z]+$/
        return regExp.test(str)
      },
      lengthValidation: function (str) {
        return str.length >= 8 && str.length <= 20
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

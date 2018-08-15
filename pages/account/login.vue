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
  import axios from '~/plugins/axios'
  import qs from 'qs'

  export default {
    methods: {
      submit: function () {
        console.log('test')
        // login code here...
        const params = {
          username: document.getElementById('username').value,
          password: document.getElementById('pwd').value
        }
        axios.post('/api/user', qs.stringify(params)
        ).then(function (response) {
          console.log('success')
          console.log(response)
        }).catch(function (error) {
          console.log('false')
          console.log(error)
        })
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

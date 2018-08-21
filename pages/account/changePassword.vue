<template>
  <div>
    <h1> 修改帳號 </h1>
    <label> 帳號：{{username}} </label> <br/>
    <label> 新密碼 new password </label> <input type="text" id="pwd"/> <br/>
    <label> 確認新密碼 check new password </label> <input type="text" id="checkPwd"/> <br/>
    <button type="button" v-on:click="submit"> 修改 </button>
  </div>
</template>

<script>
export default {
  methods: {
    submit: function () {
      const pwd = document.getElementById('pwd').value
      const checkPwd = document.getElementById('checkPwd').value
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
      // check password and check password equality.
      if (pwd !== checkPwd) {
        console.log('password is not equal to check password!!')
        // TODO: error action.
        return
      }
      // TODO: send request to server.
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

</style>

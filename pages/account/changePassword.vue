<template>
  <div>
    <section v-show="this.isSubmit === false">
      <h1> 修改帳號 </h1>
      <label v-if="this.$store.getters.getModifyUser"> 帳號：{{this.$store.getters.getModifyUser}} </label> <br/>
      <label v-if="this.$store.getters.getAuthUser"> 帳號：{{this.$store.getters.getAuthUser}} </label> <br/>
      <label v-if="this.$store.getters.getAuthUser"> 舊密碼 old password </label>  <input type="password" id="oldPwd"/> <br/>
      <label> 新密碼 new password </label> <input type="password" id="pwd"/> <br/>
      <label> 確認新密碼 check new password </label> <input type="password" id="checkPwd"/> <br/>
      <button type="button" v-on:click="submit"> 修改 </button>
    </section>  
    <section v-show="this.isSubmit === true">
      <p v-if="this.$store.getters.getModifyUser"> 密碼修改成功，系統將在 5 秒後自動導向首頁 </p>
      <p v-if="this.$store.getters.getAuthUser"> 密碼修改成功，系統將清除登入紀錄並在 5 秒後自動導向首頁 </p>
      <router-link v-bind:to="{path: '/'}"> 點擊連結立即導向首頁 </router-link>
    </section>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import qs from 'qs'

export default {
  data () {
    return {
      isSubmit: false
    }
  },
  methods: {
    submit: async function () {
      const oldPwd = document.getElementById('oldPwd').value
      const pwd = document.getElementById('pwd').value
      const checkPwd = document.getElementById('checkPwd').value
      // check password value validation.
      if (!this.valValidation(oldPwd)) {
        console.log('value format error')
        // TODO: error action.
        return
      }
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
      if (this.$store.getters.getModifyUser) {
        try {
          const params = {
            username: this.$store.getters.getModifyUser,
            new_pwd: checkPwd
          }
          await axios('/api/verified_change_pwd', {
            method: 'POST',
            data: qs.stringify(params)
          })
          this.isSubmit = true
          // auto jump to index after 5 seconds.
          setTimeout(() => { this.$router.push('/') }, 5000)
        } catch (error) {

        }
      } else if (this.$store.getters.getAuthUser) {
        try {
          console.log(oldPwd)
          const params = {
            username: this.$store.getters.getAuthUser,
            pwd: oldPwd,
            new_pwd: checkPwd
          }
          await axios('/api/change_pwd', {
            method: 'POST',
            data: qs.stringify(params)
          })
          this.isSubmit = true
          // auto jump to index after 5 seconds.
          setTimeout(() => { this.$router.push('/') }, 5000)
        } catch (error) {

        }
      }
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

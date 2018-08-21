<template>
  <div>
      <section v-show="this.isSubmit === false">
        <label> 請輸入你的帳號 </label>
        <input type="text" id="username"/> <br/>
        <button type="button" v-on:click="submit"> 確定 </button>
      </section>
      <section v-show="this.isSubmit === true">
        <p> 修改密碼的驗證信件已傳送至該帳號信箱中！請至信箱中確認！ </p>
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
      try {
        const params = {
          username: document.getElementById('username').value
        }
        await axios('/api/forget_pwd', {
          method: 'POST',
          data: qs.stringify(params)
        })
        this.isSubmit = true
        console.log(this.isSubmit)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>

</style>

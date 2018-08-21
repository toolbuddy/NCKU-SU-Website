<template>
  <div>
    <p> 信箱認證成功，系統將在 5 秒後自動導向首頁 </p>
    <router-link v-bind:to="{path: '/'}"> 點擊連結立即導向首頁 </router-link>
  </div>
</template>

<script>
export default {
  mounted () {
    setTimeout(() => { this.$router.push('/') }, 5000)
  }
}
</script>

<style scoped>

</style>

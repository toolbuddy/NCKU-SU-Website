<template>
  <h1> Index 首頁 </h1>
</template>

<script>

export default {
  components: {
  },
  async asyncData () {
  },
  head () {
    return {
      title: 'Developers'
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.developers
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.developer
{
  margin: 10px 0;
}
</style>

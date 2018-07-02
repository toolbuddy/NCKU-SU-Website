<template>
  <section class="container">
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  components: {
  },
  async asyncData () {
    let { data } = await axios.get('/api/developers')
    return { developers: data }
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

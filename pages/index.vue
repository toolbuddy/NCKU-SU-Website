<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      DEVELOPERS
    </h1>
    <ul class="developers">
      <li v-for="(developer, index) in developers" :key="index" class="developer">
        <nuxt-link :to="{ name: 'id', params: { id: index }}">
          {{ developer.name }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
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

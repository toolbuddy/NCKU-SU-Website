<template>
  <div>
    <topnews-comp v-for="post in this.articles" :key="post.content" v-bind:title="post.title" v-bind:author="post.author" 
      v-bind:time="post.title" v-bind:visitors="post.visit" v-bind:content="post.content"> </topnews-comp>
  
    <pagination v-bind:total="total" v-bind:displayPage="10" v-bind:postPerPage="10" v-bind:currentPage="currentPage"> </pagination>
  </div>

</template>

<script>
  import axios from '~/plugins/axios'
  import qs from 'querystring'
  import TopnewsComp from '~/components/announcement/topnews-column.vue'
  import Pagination from '~/components/announcement/pagination.vue'
  
  export default {
    async asyncData ({ params, error }) {
      const offsetNumber = (parseInt(params.page) - 1) * 10
      const currentPagePosts = await axios('/api/getTopnews', {
        method: 'post',
        data: qs.stringify({ offset: offsetNumber })
      })
      const totalNumber = await axios('/api/getTopnewsSum', {
        method: 'post'
      })
      return {
        articles: currentPagePosts.data,
        total: parseInt(totalNumber.data),
        currentPage: parseInt(params.page)
      }
    },
    components: {
      TopnewsComp,
      Pagination
    },
    mounted () {
      console.log(this.articles)
    }
  }
</script>

<style scoped>
</style>
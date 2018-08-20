<template>
  <div>
    <message-comp v-for="(post, index) in this.articles" v-bind:key="post.content" v-bind:id="index + (currentPage - 1) * 10 + 1" v-bind:title="post.title"
      v-bind:author="post.studentId" v-bind:time="post.createdAt" v-bind:visitors="post.visit" v-bind:content="post.content"> </message-comp>
  
    <pagination v-bind:total="total" v-bind:displayPage="10" v-bind:postPerPage="10" v-bind:currentPage="currentPage"> </pagination>
  </div>

</template>

<script>
  import axios from '~/plugins/axios'
  import qs from 'querystring'
  import MessageComp from '~/components/announcement/message-column.vue'
  import Pagination from '~/components/announcement/pagination.vue'
  
  export default {
    async asyncData ({ params, error }) {
      const offsetNumber = (parseInt(params.page) - 1) * 10
      const currentPagePosts = await axios('/api/getMessage', {
        method: 'post',
        data: qs.stringify({ number: 10, offset: offsetNumber })
      })
      const totalNumber = await axios('/api/getMessageSum', {
        method: 'post'
      })
      return {
        articles: currentPagePosts.data,
        total: parseInt(totalNumber.data),
        currentPage: parseInt(params.page)
      }
    },
    components: {
      MessageComp,
      Pagination
    },
    mounted () {
    }
  }
</script>

<style scoped>
</style>
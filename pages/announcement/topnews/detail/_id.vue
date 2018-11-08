<template>
  <topnews-detail v-bind:title="post.title" v-bind:author="post.studentId" v-bind:time="post.createdAt" 
    v-bind:visitors="post.visit" v-bind:content="post.content" > </topnews-detail>
</template>

<script>
  import axios from '~/plugins/axios'
  import qs from 'querystring'
  import TopnewsDetail from '~/components/announcement/topnews-detail.vue'

  export default {
    async asyncData ({ params, error }) {
      const offsetNumber = parseInt(params.id)
      const currentPost = await axios('/api/getTopnews', {
        method: 'post',
        data: qs.stringify({ number: 1, offset: offsetNumber - 1 })
      })
      return {
        post: currentPost.data[0]
      }
    },
    components: {
      TopnewsDetail
    }
  }
</script>

<style scoped>

</style>

<template>
  <message-detail v-bind:title="post.title" v-bind:author="post.studentId" v-bind:time="post.createdAt" 
    v-bind:visitors="post.visit" v-bind:content="post.content" > </message-detail>
</template>

<script>
  import axios from '~/plugins/axios'
  import qs from 'querystring'
  import MessageDetail from '~/components/announcement/message-detail.vue'

  export default {
    async asyncData ({ params, error }) {
      const offsetNumber = parseInt(params.id)
      console.log(offsetNumber)
      const currentPost = await axios('/api/getMessage', {
        method: 'post',
        data: qs.stringify({ number: 1, offset: offsetNumber - 1 })
      })
      return {
        post: currentPost.data[0]
      }
    },
    components: {
      MessageDetail
    }
  }
</script>

<style scoped>

</style>

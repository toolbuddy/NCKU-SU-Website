<template>
  <div>
    <message-comp v-for="post in this.articles" :key="post.content" v-bind:title="post.title" v-bind:author="post.author" 
      v-bind:time="post.title" v-bind:visitors="post.visit" v-bind:content="post.content"> </message-comp>
  </div>

</template>

<script>
  import MessageComp from '~/components/announcement/topnews-column.vue'

  export default {
    data () {
      return {
        articles: [
          {title: 'test', author: 'F74052104', time: '2018-08-15 08:08 AM', visit: 120, content: '<p>test for content</p>'},
          {title: 'test2', author: 'F74052104', time: '2018-08-15 08:18 AM', visit: 240, content: '<p>test2 for content</p>'},
          {title: 'test3', author: 'F74052104', time: '2018-08-15 08:28 AM', visit: 360, content: '<p>test3 for content</p>'}
        ]
      }
    },
    async asyncData (context) {
    },
    components: {
      MessageComp
    }
  }
</script>

<style scoped>
</style>
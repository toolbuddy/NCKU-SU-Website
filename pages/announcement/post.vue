<template>
  <div>
    <h1> Post 發布文章 </h1>
    <custom-post author="f26401004"> </custom-post>
  </div>
</template>
<script>
  import CustomPost from '~/components/announcement/editor/post.vue'

  export default {
    components: {
      CustomPost
    }
  }
</script>

<style scoped>

</style>
